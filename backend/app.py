import os
import subprocess

from flask import Flask, request, jsonify
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
if not os.path.exists("model_bundle.pkl"):
    print("model_bundle.pkl not found. Running model.py to generate it...")
    subprocess.run(["python", "model.py"], check=True)
    print("model.py executed. Model generated successfully!")
# -----------------------------
# Load Model + Encoders Bundle
# -----------------------------
with open("model_bundle.pkl", "rb") as f:
    bundle = pickle.load(f)

model = bundle["model"]
le_gender = bundle["le_gender"]
le_style = bundle["le_style"]
le_discussion = bundle["le_discussion"]
le_tech = bundle["le_tech"]
le_level = bundle["le_level"]
le_grade = bundle["le_grade"]


# -----------------------------
# ALL FEATURES IN ORDER
# -----------------------------
features = [
    "Age",
    "Gender",
    "Study_Hours_per_Week",
    "Preferred_Learning_Style",
    "Online_Courses_Completed",
    "Participation_in_Discussions",
    "Assignment_Completion_Rate",
    "Exam_Score",
    "Attendance_Rate",
    "Use_of_Educational_Tech",
    "Self_Reported_Stress_Level",
    "Time_Spent_on_Social_Media",
    "Sleep_Hours_per_Night"
]


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # JSON from React
        
        input_data = {}

        for feature in features:
            value = data.get(feature)

            if value is None:
                return jsonify({"error": f"Missing value for {feature}"}), 400

            # Categorical label encoding
            if feature == "Gender":
                value = le_gender.transform([value])[0]

            elif feature == "Preferred_Learning_Style":
                value = le_style.transform([value])[0]

            elif feature == "Participation_in_Discussions":
                value = le_discussion.transform([value])[0]

            elif feature == "Use_of_Educational_Tech":
                value = le_tech.transform([value])[0]

            elif feature == "Self_Reported_Stress_Level":
                value = le_level.transform([value])[0]

            else:
                # Convert numeric fields to float
                value = float(value)

            # Save processed value
            input_data[feature] = value

        # Create DataFrame
        user_df = pd.DataFrame([input_data])

        # Predict
        prediction = model.predict(user_df)[0]

        # Decode grade (A, B, C, D)
        final_grade = le_grade.inverse_transform([int(prediction)])[0]
        print(final_grade)
        return jsonify({"predicted_grade": final_grade})

    except Exception as e:
        return jsonify({"error": str(e)})



@app.route("/", methods=["GET"])
def home():
    return "Student Performance Prediction API Running!"


if __name__ == "__main__":
    app.run(debug=True)
