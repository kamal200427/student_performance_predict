# progress_api.py
from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# If you already have `app` and `db`, adapt accordingly.
# Example assumes you import this blueprint into your main Flask app where `app` exists.
progress_bp = Blueprint("progress", __name__)
db = SQLAlchemy()  # initialize with app in factory or main file

class ProgressEntry(db.Model):
    __tablename__ = "progress_entries"
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(128), nullable=False, index=True)
    date = db.Column(db.Date, nullable=False, index=True)
    study_hours = db.Column(db.Float, nullable=False, default=0.0)
    exam_score = db.Column(db.Float, nullable=True)
    attendance = db.Column(db.Float, nullable=True)   # percent 0-100
    stress_level = db.Column(db.Integer, nullable=True) # 1-10 or map high/med/low
    sleep_hours = db.Column(db.Float, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "student_id": self.student_id,
            "date": self.date.isoformat(),
            "study_hours": self.study_hours,
            "exam_score": self.exam_score,
            "attendance": self.attendance,
            "stress_level": self.stress_level,
            "sleep_hours": self.sleep_hours,
        }

# Routes

@progress_bp.route("/progress", methods=["POST"])
def add_progress():
    payload = request.get_json(force=True)
    required = ["student_id", "date", "study_hours"]
    for r in required:
        if r not in payload:
            return jsonify({"error": f"Missing {r}"}), 400

    try:
        student_id = str(payload["student_id"])
        date = datetime.fromisoformat(payload["date"]).date()
        study_hours = float(payload.get("study_hours", 0))
        exam_score = payload.get("exam_score")
        exam_score = float(exam_score) if exam_score not in (None, "") else None
        attendance = payload.get("attendance")
        attendance = float(attendance) if attendance not in (None, "") else None
        stress_level = payload.get("stress_level")
        stress_level = int(stress_level) if stress_level not in (None, "") else None
        sleep_hours = payload.get("sleep_hours")
        sleep_hours = float(sleep_hours) if sleep_hours not in (None, "") else None

        entry = ProgressEntry(
            student_id=student_id,
            date=date,
            study_hours=study_hours,
            exam_score=exam_score,
            attendance=attendance,
            stress_level=stress_level,
            sleep_hours=sleep_hours
        )
        db.session.add(entry)
        db.session.commit()
        return jsonify({"status": "ok", "entry": entry.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@progress_bp.route("/progress", methods=["GET"])
def get_progress():
    student_id = request.args.get("student_id")
    if not student_id:
        return jsonify({"error": "student_id required"}), 400

    date_from = request.args.get("from")  # optional
    date_to = request.args.get("to")

    q = ProgressEntry.query.filter_by(student_id=student_id)
    if date_from:
        q = q.filter(ProgressEntry.date >= datetime.fromisoformat(date_from).date())
    if date_to:
        q = q.filter(ProgressEntry.date <= datetime.fromisoformat(date_to).date())

    q = q.order_by(ProgressEntry.date.asc())
    results = [r.to_dict() for r in q.all()]
    return jsonify({"entries": results})

@progress_bp.route("/progress/summary", methods=["GET"])
def progress_summary():
    # simple aggregated stats for the student
    student_id = request.args.get("student_id")
    if not student_id:
        return jsonify({"error": "student_id required"}), 400

    q = ProgressEntry.query.filter_by(student_id=student_id)
    total = q.count()
    if total == 0:
        return jsonify({"summary": {}, "count": 0})

    # averages
    avg_study = db.session.query(db.func.avg(ProgressEntry.study_hours)).filter_by(student_id=student_id).scalar()
    avg_exam = db.session.query(db.func.avg(ProgressEntry.exam_score)).filter_by(student_id=student_id).scalar()
    avg_att = db.session.query(db.func.avg(ProgressEntry.attendance)).filter_by(student_id=student_id).scalar()
    avg_sleep = db.session.query(db.func.avg(ProgressEntry.sleep_hours)).filter_by(student_id=student_id).scalar()
    avg_stress = db.session.query(db.func.avg(ProgressEntry.stress_level)).filter_by(student_id=student_id).scalar()

    return jsonify({
        "count": total,
        "avg_study_hours": float(avg_study or 0),
        "avg_exam_score": float(avg_exam or 0),
        "avg_attendance": float(avg_att or 0),
        "avg_sleep_hours": float(avg_sleep or 0),
        "avg_stress_level": float(avg_stress or 0)
    })
