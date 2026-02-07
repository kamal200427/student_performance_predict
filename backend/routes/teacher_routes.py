from flask import Blueprint, request, jsonify
from sqlalchemy import func
from datetime import datetime
from database import db
from models.suggestion import Suggestion

# --------------------------------
# Teacher Blueprint
# --------------------------------
teacher_bp = Blueprint("teacher", __name__, url_prefix="/teacher")
# --------------------------------
# POST: Teacher sends suggestion
# --------------------------------
@teacher_bp.route("/send-suggestion", methods=["POST"])
def send_suggestion():
    """
    Teacher sends advice to specific students
    """

    data = request.get_json(force=True)

    student_ids = data.get("student_ids", [])
    message = data.get("message", "").strip()
    teacher_id = data.get("teacher_id")
    if not student_ids or not message:
        return jsonify({"error": "student_ids and suggestion required"}), 400

    for sid in student_ids:
        suggestion = Suggestion(
            teacher_id=teacher_id,
            student_id=sid,
            message=message,
            created_at=datetime.utcnow()
        )
        db.session.add(suggestion)

    db.session.commit()

    return jsonify({"message": "Suggestion sent successfully"})
