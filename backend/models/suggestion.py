from datetime import datetime
from database.db import db


class Suggestion(db.Model):
    """
    Suggestion Model
    -----------------
    Stores teacher suggestions sent to specific students.
    Students can view these suggestions in their dashboard.
    """

    __tablename__ = "suggestions"

    id = db.Column(db.Integer, primary_key=True)

    # Who receives the suggestion
    student_id = db.Column(db.String(100), nullable=False)


    # Who sent the suggestion
    teacher_id = db.Column(
        db.String(100),
        nullable=False
    )

    # Message content
    message = db.Column(db.Text, nullable=False)

    # Status flags
    is_read = db.Column(db.Boolean, default=False)

    # Timestamp
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # --------------------
    # Helper method
    # --------------------
    def to_dict(self):
        """Serialize suggestion object"""
        return {
            "id": self.id,
            "student_id": self.student_id,
            "teacher_id": self.teacher_id,
            "message": self.message,
            "is_read": self.is_read,
            "created_at": self.created_at.isoformat()
        }
# from datetime import datetime
# from database import db

class StudentSuggestion(db.Model):
    __tablename__ = "student_suggestions"

    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(100), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
