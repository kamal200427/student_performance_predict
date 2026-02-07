from flask import Blueprint, request, jsonify
from sqlalchemy import func
from database import db
from models.performance import StudentDailyPerformance
from models.suggestion import  Suggestion
from models.user import User
# --------------------------------
# Blueprint for student operations
# --------------------------------
student_bp = Blueprint("student", __name__, url_prefix="/student")

# --------------------------------
# GET: Student dashboard overview
# --------------------------------
@student_bp.route("/profile", methods=["GET"])
def student_profile():
    student_id = request.args.get("student_id")
    role = request.args.get("role") 
    
    user = User.query.filter_by(username=student_id, role=role).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    # 🔐 ROLE CHECK
    if user.role != role:
        return jsonify({"error": "Unauthorized role access"}), 403
    
    return jsonify({
        "student_id": student_id,
         "username":user.username,
         "name":user.name,
         "email":user.email,
         "role":user.role
    })
    
@student_bp.route("/overview", methods=["GET"])
def student_overview():
    """
    Returns student dashboard summary:
    - latest performance
    - average score
    - attendance trend
    - performance level count
    """

    student_id = request.args.get("student_id")

    if not student_id:
        return jsonify({"error": "student_id is required"}), 400

    # Latest entry
    latest = (
        StudentDailyPerformance.query
        .filter_by(student_id=student_id)
        .order_by(StudentDailyPerformance.created_at.desc())
        .first()
    )

    if not latest:
        return jsonify({
            "student_id": student_id,
            "message": "No performance data found yet"
        })
    last_seven = (
    StudentDailyPerformance.query
    .filter_by(student_id=student_id)
    .order_by(StudentDailyPerformance.created_at.desc())
    .limit(7)
    .all()
    )

    
    # Aggregates
    avg_score = db.session.query(
        func.avg(StudentDailyPerformance.score)
    ).filter_by(student_id=student_id).scalar()

    avg_attendance = db.session.query(
        func.avg(StudentDailyPerformance.attendance)
    ).filter_by(student_id=student_id).scalar()

    total_days = StudentDailyPerformance.query.filter_by(
        student_id=student_id
    ).count()

    performance_distribution = (
        db.session.query(
            StudentDailyPerformance.performance,
            func.count(StudentDailyPerformance.id)
        )
        .filter_by(student_id=student_id)
        .group_by(StudentDailyPerformance.performance)
        .all()
    )

    return jsonify({
        "student_id": student_id,
        "latest": {
            "date": latest.created_at.strftime("%Y-%m-%d"),
            "attendance": latest.attendance,
            "sleep_hours": latest.sleep_hours,
            "score":latest.score
        },
        "averages": {
            "score": round(avg_score or 0, 2),
            "attendance": round(avg_attendance or 0, 2),
        },
        "total_days_tracked": total_days,
        "performance_breakdown": {
            p: c for p, c in performance_distribution
        },
         "last_seven": [
        {
            "date": row.created_at.strftime("%Y-%m-%d"),
            "score": row.score,
            "study_hours": row.study_hours,
            "attendance": row.attendance
        }
        for row in last_seven
    ]
    })
@student_bp.route("/suggestion", methods=["GET"])
def get_student_messages():
    
    try:
        # ✅ get student_id from query params
        student_id = request.args.get("student_id")
        messages = (
            db.session.query(
                Suggestion.id,
                Suggestion.message,
                Suggestion.is_read,
                Suggestion.created_at,
                Suggestion.teacher_id,
                User.name.label("teacher_name"),
                User.username.label("teacher_username"),
            )
            .join(User, Suggestion.teacher_id == User.username)
            .filter(Suggestion.student_id == student_id)
            .order_by(Suggestion.created_at.desc()).limit(5)
            .all()
        )

        result = [
            {
                "id": m.id,
                "message": m.message,
                "is_read": m.is_read,
                "created_at": m.created_at.isoformat(),
                "teacher_id": m.teacher_id,
                "teacher_name": m.teacher_name,
                "teacher_username": m.teacher_username,
            }
            for m in messages
        ]

        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
