import time
from flask import Flask, request, jsonify
from flask_cors import CORS
import requests   # ← Used to call local Ollama model

app = Flask(__name__)
CORS(app)

# -----------------------------
# Rate Limit
# -----------------------------
_visits = {}

def rate_limit(ip, limit=20, period=60):
    now = time.time()
    _visits.setdefault(ip, [])
    _visits[ip] = [t for t in _visits[ip] if now - t < period]

    if len(_visits[ip]) >= limit:
        return False

    _visits[ip].append(now)
    return True


# -----------------------------
# Tutor style system message
# -----------------------------
def tutor_system_prompt():
    return (
        "You are a helpful tutor assistant. "
        "Explain concepts simply, clearly, and step-by-step. "
        "Keep answers short and friendly."
    )


# -----------------------------
# Fallback when local model fails
# -----------------------------
def fallback_reply(msg):
    if "study" in msg.lower():
        return "Try studying in short 45-minute sessions. I can help you plan!"
    return "I'm here to help! Ask me anything."


# -----------------------------
# CHAT ROUTE
# -----------------------------
@app.route("/api/chat", methods=["POST"])
def chat():
    ip = request.remote_addr

    # Rate limit
    if not rate_limit(ip):
        return jsonify({"reply": "Too many requests. Please slow down."}), 429

    message = request.json.get("message", "").strip()
    if not message:
        return jsonify({"reply": "Please type something."})

    # -----------------------------
    # CALL LOCAL OLLAMA MODEL
    # -----------------------------
    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3.2",
                "prompt": tutor_system_prompt() + "\nUser: " + message + "\nAssistant:"
            }
        ).json()

        reply = response.get("response", "")
        if not reply:
            reply = fallback_reply(message)

        return jsonify({"reply": reply})

    except Exception as e:
        print("OLLAMA ERROR:", e)
        return jsonify({"reply": fallback_reply(message)})


# -----------------------------
# RUN APP
# -----------------------------
if __name__ == "__main__":
    app.run(port=5000, debug=True)
