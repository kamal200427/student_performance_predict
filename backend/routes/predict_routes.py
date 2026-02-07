from flask import Blueprint, request, jsonify
predict_bp = Blueprint("predict", __name__, url_prefix="/predict")

import subprocess
from datetime import datetime,timezone
import pandas as pd
from typing import Any
from database.db import db
# from database import db
from models.performance import StudentDailyPerformance
from ml.model_loader import load_model_bundle
import logging
import os
import pickle
from utils.helpers import safe_round,grade_from_score
# -------------------------------------------------
# Blueprint
# -------------------------------------------------
MODEL_BUNDLE_PATH = os.path.join("ml", "rf_daily_model.pkl")
GENERATE_CMD = ["python", os.path.join("ml", "model.py")]
# -------------------------------------------------
# Load ML model bundle (model + encoders + features)
# -------------------------------------------------
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

#  Load ML model bundle
# -----------------------
def ensure_model_bundle(path: str):
    if not os.path.exists(path):
        logger.info("Model bundle not found. Training model...")
        subprocess.run(GENERATE_CMD, check=True)
    else:
        logger.info("Model bundle found. Skipping training.")
ensure_model_bundle(MODEL_BUNDLE_PATH)

with open(MODEL_BUNDLE_PATH, "rb") as f:
    bundle = pickle.load(f)

model = bundle["model"]
le_gender = bundle["le_gender"]
le_participation = bundle["le_participation"]
le_tech = bundle["le_tech"]
FEATURES = bundle["features"]

# -----------------------
# Helper functions
# -----------------------
def safe_label_transform(le, value: Any, field_name: str):
    try:
        return le.transform([value])[0]
    except Exception:
        logger.warning("Unknown value for %s: %s", field_name, value)
        return le.transform([le.classes_[0]])[0]


def to_float_safe(v, field):
    try:
        return float(v)
    except Exception:
        raise ValueError(f"{field} must be numeric")


# -----------------------
# Prediction API
# -----------------------
@predict_bp.route("", methods=["POST"])
def predict():
    try:
        data = request.get_json(force=True)
        if not isinstance(data, dict):
            return jsonify({"error": "Invalid JSON payload"}), 400

        input_data = {}

        for feature in FEATURES:
            if feature not in data:
                return jsonify({"error": f"Missing field: {feature}"}), 400

            if feature == "Gender":
                input_data[feature] = safe_label_transform(le_gender, data[feature], feature)
            elif feature == "Participation_Today":
                input_data[feature] = safe_label_transform(le_participation, data[feature], feature)
            elif feature == "Use_of_Educational_Tech_Today":
                input_data[feature] = safe_label_transform(le_tech, data[feature], feature)
            else:
                input_data[feature] = to_float_safe(data[feature], feature)

        df = pd.DataFrame([input_data], columns=FEATURES)

        raw_score = model.predict(df)[0]
        score = safe_round(raw_score)
        performance = grade_from_score(score)

        # -----------------------
        # Auto-store daily entry
        # -----------------------
        entry = StudentDailyPerformance(
            student_id=data.get("student_id", "guest"),
            age=data.get("Age"),
            gender=data.get("Gender"),
            study_hours=data.get("Study_Hours_Today"),
            attendance=data.get("Attendance_Today"),
            assignment_worked=data.get("Assignment_Worked_Today"),
            sleep_hours=data.get("Sleep_Hours_Last_Night"),
            stress_level=data.get("Stress_Level_Today"),
            social_media=data.get("Time_Spent_on_Social_Media_Today"),
            participation=data.get("Participation_Today"),
            edtech=data.get("Use_of_Educational_Tech_Today"),
            score=score,
            performance=performance,
            created_at=datetime.now(timezone.utc),
        )
    
        db.session.add(entry)
        db.session.commit()
         
        return jsonify({
            "score": score,
            "predicted_grade": performance,
        })

    except Exception as e:
        logger.exception("Prediction failed")
        return jsonify({"error": str(e)}), 500

