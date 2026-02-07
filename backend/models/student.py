from datetime import datetime
from database.db import db


class Student(db.Model):
    """
    Student Model
    ----------------
    Stores basic student profile information.
    This table is used for:
    - Authentication (student login)
    - Linking performance records
    - Teacher dashboards & suggestions
    """

    __tablename__ = "students"

    id = db.Column(db.Integer, primary_key=True)

    # Unique student identifier (used in frontend & APIs)
    student_id = db.Column(db.String(100), unique=True, nullable=False)

    # Basic profile
    name = db.Column(db.String(120), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)

    # Optional academic metadata
    department = db.Column(db.String(100), nullable=True)
    year = db.Column(db.String(20), nullable=True)

    # Role (future-proofing: student / teacher / admin)
    role = db.Column(db.String(20), default="student")

    # Account status
    is_active = db.Column(db.Boolean, default=True)

    # Audit fields
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # --------------------
    # Relationships
    # --------------------
    performances = db.relationship(
        "StudentDailyPerformance",
        backref="student",
        lazy=True,
        cascade="all, delete-orphan"
    )

    def to_dict(self):
        """Serialize student object"""
        return {
            "student_id": self.student_id,
            "name": self.name,
            "age": self.age,
            "gender": self.gender,
            "department": self.department,
            "year": self.year,
            "role": self.role,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat()
        }
