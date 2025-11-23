import os
import time
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

import openai
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

_visits = {}

def rate_limit(ip, limit=20, period=60):
    now = time.time()
    _visits.setdefault(ip, [])
    _visits[ip] = [t for t in _visits[ip] if now - t < period]
    if len(_visits[ip]) >= limit:
        return False
    _visits[ip].append(now)
    return True

def tutor_system_prompt():
    return (
        "You are a helpful tutor assistant. Explain concepts clearly, step-by-step. "
        + "Provide study tips and keep answers short and encouraging."
    )

def fallback_reply(msg):
    if "study" in msg.lower():
        return "Try studying with 45-minute focused sessions. I can help you plan!"
    return "I'm here to help! Ask me anything."

@app.route("/api/chat", methods=["POST"])
def chat():
    ip = request.remote_addr
    if not rate_limit(ip):
        return jsonify({"reply": "Too many requests. Please slow down."}), 429

    data = request.json
    message = data.get("message", "").strip()
    if not message:
        return jsonify({"reply": "Please type something."})

    # Use OpenAI if available
    if openai.api_key:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": tutor_system_prompt()},
                    {"role": "user", "content": message},
                ],
                max_tokens=300,
            )
            reply = response.choices[0].message.content
            return jsonify({"reply": reply})
        except Exception as e:
            print("OpenAI error:", e)

    # fallback
    return jsonify({"reply": fallback_reply(message)})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
