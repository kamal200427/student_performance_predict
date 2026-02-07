# backend/models/performance.py

from datetime import datetime
from database.db import db


class StudentDailyPerformance(db.Model):
    """
    Stores DAILY performance data of a student.
    Each row = one performance prediction event.
    """

    __tablename__ = "student_daily_performance"

    # -----------------------
    # Primary Key
    # -----------------------
    id = db.Column(db.Integer, primary_key=True)

    # -----------------------
    # Student Info
    # -----------------------
    student_id = db.Column(db.String(100), nullable=False, index=True)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)

    # -----------------------
    # Daily Academic Inputs
    # -----------------------
    study_hours = db.Column(db.Float, nullable=False)
    attendance = db.Column(db.Float, nullable=False)
    assignment_worked = db.Column(db.Float, nullable=False)
    sleep_hours = db.Column(db.Float, nullable=False)
    stress_level = db.Column(db.Integer, nullable=False)
    social_media = db.Column(db.Float, nullable=False)
    participation = db.Column(db.String(10), nullable=False)
    edtech = db.Column(db.String(5), nullable=False)

    # -----------------------
    # ML Prediction Output
    # -----------------------
    score = db.Column(db.Float, nullable=False)
    performance = db.Column(db.String(20), nullable=False)

    # -----------------------
    # Metadata
    # -----------------------
    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        nullable=False,
        index=True,
    )

    # -----------------------
    # Helper Method
    # -----------------------
    def to_dict(self):
        """Convert model instance to JSON-serializable dict"""
        return {
            "id": self.id,
            "student_id": self.student_id,
            "age": self.age,
            "gender": self.gender,
            "study_hours": self.study_hours,
            "attendance": self.attendance,
            "assignment_worked": self.assignment_worked,
            "sleep_hours": self.sleep_hours,
            "stress_level": self.stress_level,
            "social_media": self.social_media,
            "participation": self.participation,
            "edtech": self.edtech,
            "score": self.score,
            "performance": self.performance,
            "created_at": self.created_at.isoformat(),
        }
