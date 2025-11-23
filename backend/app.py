# app.py (merged predict + progress blueprint + chat)
import os
import subprocess
import time
import logging
import pickle
from typing import Any
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import requests

# progress_model must provide db and progress_bp (your existing code)
from progress_model import db, progress_bp

# Optional OpenAI import
try:
    import openai
except Exception:
    openai = None

# -----------------------
# Configuration
# -----------------------
MODEL_BUNDLE_PATH = "model_bundle.pkl"
GENERATE_CMD = ["python", "model.py"]
BOT_AVATAR_PATH = "/mnt/data/950f54f9-3774-48b8-b476-6f101956ee6f.png"  # dev avatar file path

CHAT_RATE_LIMIT_PERIOD = 60
CHAT_RATE_LIMIT_MAX = 40

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

# -----------------------
# Flask app + DB + CORS
# -----------------------
app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
with app.app_context():
    db.create_all()
app.register_blueprint(progress_bp)

# -----------------------
# Load model bundle
# -----------------------
def ensure_model_bundle(path: str):
    if not os.path.exists(path):
        logger.info("%s not found, running model.py to generate it...", path)
        subprocess.run(GENERATE_CMD, check=True)

ensure_model_bundle(MODEL_BUNDLE_PATH)
with open(MODEL_BUNDLE_PATH, "rb") as f:
    bundle = pickle.load(f)

model = bundle.get("model")
le_gender = bundle.get("le_gender")
le_style = bundle.get("le_style")
le_discussion = bundle.get("le_discussion")
le_tech = bundle.get("le_tech")
le_level = bundle.get("le_level")
le_grade = bundle.get("le_grade")

FEATURES = [
    "Age", "Gender", "Study_Hours_per_Week", "Preferred_Learning_Style",
    "Online_Courses_Completed", "Participation_in_Discussions",
    "Assignment_Completion_Rate", "Exam_Score", "Attendance_Rate",
    "Use_of_Educational_Tech", "Self_Reported_Stress_Level",
    "Time_Spent_on_Social_Media", "Sleep_Hours_per_Night"
]

# -----------------------
# Helpers for prediction
# -----------------------
def safe_label_transform(le, value: Any, field_name: str):
    try:
        return le.transform([value])[0]
    except Exception:
        logger.warning("Unknown category for %s: %s — falling back to first class.", field_name, value)
        try:
            return le.transform([le.classes_[0]])[0]
        except Exception:
            return 0

def to_float_safe(v, field):
    try:
        return float(v)
    except Exception:
        raise ValueError(f"Field {field} must be numeric; got {v!r}")

# -----------------------
# Prediction endpoint
# -----------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        if not isinstance(data, dict):
            return jsonify({"error": "Invalid JSON payload"}), 400

        input_data = {}
        for feature in FEATURES:
            if feature not in data:
                return jsonify({"error": f"Missing value for {feature}"}), 400
            value = data[feature]
            if feature == "Gender":
                input_data[feature] = safe_label_transform(le_gender, value, "Gender")
            elif feature == "Preferred_Learning_Style":
                input_data[feature] = safe_label_transform(le_style, value, "Preferred_Learning_Style")
            elif feature == "Participation_in_Discussions":
                input_data[feature] = safe_label_transform(le_discussion, value, "Participation_in_Discussions")
            elif feature == "Use_of_Educational_Tech":
                input_data[feature] = safe_label_transform(le_tech, value, "Use_of_Educational_Tech")
            elif feature == "Self_Reported_Stress_Level":
                input_data[feature] = safe_label_transform(le_level, value, "Self_Reported_Stress_Level")
            else:
                input_data[feature] = to_float_safe(value, feature)

        df = pd.DataFrame([input_data])
        pred = model.predict(df)
        try:
            final_grade = le_grade.inverse_transform([int(pred[0])])[0]
        except Exception:
            final_grade = pred[0]
        return jsonify({"predicted_grade": final_grade})
    except Exception as e:
        logger.exception("Prediction error")
        return jsonify({"error": str(e)}), 500

# -----------------------
# Chatbot endpoint (OpenAI-backed; fallback included)
# -----------------------
_visits = {}

def rate_limit_check(ip: str, limit: int = CHAT_RATE_LIMIT_MAX, period: int = CHAT_RATE_LIMIT_PERIOD):
    now = time.time()
    _visits.setdefault(ip, [])
    _visits[ip] = [t for t in _visits[ip] if now - t < period]
    if len(_visits[ip]) >= limit:
        return False
    _visits[ip].append(now)
    return True

def tutor_system_prompt():
    return (
        "You are an empathetic, concise tutoring assistant for school/college students. "
        "Give step-by-step explanations, study tips, and short mini-exercises when helpful. "
        "Reference student progress if available. Keep answers friendly and actionable."
    )

def fetch_student_progress_text(student_id: str, limit: int = 8) -> str:
    try:
        base = request.url_root.rstrip("/")
        r = requests.get(f"{base}/progress", params={"student_id": student_id}, timeout=2)
        if not r.ok:
            return ""
        data = r.json()
        entries = data.get("entries", [])[-limit:]
        if not entries:
            return ""
        s = "Student recent progress (date, study_hours, exam_score, attendance, sleep):\n"
        for e in entries:
            s += f"{e.get('date')}: study={e.get('study_hours')}, exam={e.get('exam_score')}, att={e.get('attendance')}, sleep={e.get('sleep_hours')}\n"
        return s
    except Exception:
        logger.debug("Could not fetch progress for student %s", student_id)
        return ""

@app.route("/api/chat", methods=["POST"])
def chat():
    ip = request.remote_addr
    if not rate_limit(ip):
        return jsonify({"reply": "You are sending messages too fast. Slow down!"}), 429

    data = request.json
    user_msg = data.get("message", "").strip()

    if not user_msg:
        return jsonify({"reply": "Please type something."}), 400

    api_key = os.getenv("OPENAI_API_KEY")

    if api_key:
        try:
            client = OpenAI(api_key=api_key)

            messages = [
                {"role": "system", "content": tutor_system_prompt()},
                {"role": "user", "content": user_msg}
            ]

            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=messages,
                max_tokens=300
            )

            reply = response.choices[0].message.content
            return jsonify({"reply": reply})

        except Exception as e:
            print("OpenAI error:", e)
            return jsonify({"reply": fallback_reply(user_msg)})

    return jsonify({"reply": fallback_reply(user_msg)})

# -----------------------
# health + root
# -----------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "healthy", "bot_avatar": BOT_AVATAR_PATH})

@app.route("/", methods=["GET"])
def home():
    return "Student Performance Prediction API Running!"

# -----------------------
# run app
# -----------------------
if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    logger.info("Starting app on port %s", port)
    app.run(host="0.0.0.0", port=port, debug=True)
