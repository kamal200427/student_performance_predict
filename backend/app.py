# backend/app.py

 

from flask import Flask, request, jsonify
from flask_cors import CORS

from database.db import db
from models.performance import StudentDailyPerformance
from models.suggestion import Suggestion
from models.performance import StudentDailyPerformance
from models.user import User


from auth import auth_bp
from routes.predict_routes import predict_bp
from routes.student_routes import student_bp
from routes.progress_routes import progress_bp
from routes.teacher_routes import teacher_bp
# -----------------------
# Configuration
# -----------------------
 
# -----------------------
# Flask app + DB + CORS
# -----------------------
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///student_performance.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

CORS(app, origins=["http://localhost:3000"])

db.init_app(app)

# REGISTER BLUEPRINT 👇
app.register_blueprint(auth_bp)
app.register_blueprint(predict_bp)
app.register_blueprint(student_bp)
app.register_blueprint(progress_bp)
app.register_blueprint(teacher_bp)

with app.app_context():
    db.create_all()

# -----------------------
# Health check
# -----------------------
@app.route("/attendance")
def health():
    return "kamalk"
    return jsonify({"status": "ok"})


# -----------------------
# Root
# -----------------------
@app.route("/")
def home():
    return "Student Performance Prediction API Running"


# -----------------------
# Run
# -----------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
