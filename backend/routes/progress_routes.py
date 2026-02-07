from flask import Blueprint, request, jsonify
from sqlalchemy import desc
from database import db
from models.performance import StudentDailyPerformance
from models.user import User
from sqlalchemy import func
from datetime import datetime, timedelta
# --------------------------------
# Blueprint
# --------------------------------
# get student preogress
progress_bp = Blueprint("progress", __name__, url_prefix="/progress")
@progress_bp.route("/latest-performances", methods=["GET"])
def get_all_students_latest_performance():
    """
    Fetch latest performance entry for each student
    """

    # 🔹 Subquery: latest timestamp per student
    subquery = (
        db.session.query(
            StudentDailyPerformance.student_id,
            func.max(StudentDailyPerformance.created_at).label("latest_time")
        )
        .group_by(StudentDailyPerformance.student_id)
        .subquery()
    )

    # 🔹 Join with main table
    latest_records = (
        db.session.query(
            StudentDailyPerformance,
            User.name.label("student_name")
        )
        .join(
            subquery,
            (StudentDailyPerformance.student_id == subquery.c.student_id) &
            (StudentDailyPerformance.created_at == subquery.c.latest_time)
        )
        .join(
            User,
            User.username == StudentDailyPerformance.student_id
        )
        .order_by(StudentDailyPerformance.created_at.desc())
        .all()
    )

    days = request.args.get("days", default=7, type=int)
    days = min(max(days, 1), 14)   # clamp between 1–14

    start_date = datetime.utcnow() - timedelta(days=days)

    results = (
        db.session.query(
            func.date(StudentDailyPerformance.created_at).label("date"),
            func.avg(StudentDailyPerformance.score).label("avg_score")
        )
        .filter(StudentDailyPerformance.created_at >= start_date)
        .group_by(func.date(StudentDailyPerformance.created_at))
        .order_by(func.date(StudentDailyPerformance.created_at).asc())
        .all()
    )

    trend = [
        {
            "date": row.date,
            "avg_score": round(float(row.avg_score), 2)
        }
        for row in results
    ]

    # 🔹 Serialize result
    result = [
        {
            "student_id": r.student_id,
            "student_name": student_name,
            "date": r.created_at.strftime("%Y-%m-%d"),
            "score": r.score,
            "performance": r.performance,
            "attendance": r.attendance,
            "study_hours": r.study_hours,
            "sleep_hours": r.sleep_hours,
        }
        for r, student_name in latest_records
    ]

    return jsonify({
        "count": len(result),
        "latest_performances": result,
        "days": days,
        "trend": trend
    })
 
# --------------------------------
# GET: Student progress history
# --------------------------------
# @progress_bp.route("", methods=["GET"])
# def get_student_progress():
#     """
#     Fetch daily performance history of a student
#     Used by Student ProgressTracker charts
#     """
# 
#     student_id = request.args.get("student_id")
# 
#     if not student_id:
#         return jsonify({"error": "student_id is required"}), 400
# 
#     entries = (
#         StudentDailyPerformance.query
#         .filter_by(student_id=student_id)
#         .order_by(StudentDailyPerformance.created_at.asc())
#         .all()
#     )
# 
#     data = [
#         {
#             "date": e.created_at.strftime("%Y-%m-%d"),
#             "time": e.created_at.strftime("%H:%M"),
#             "score": e.score,
#             "performance": e.performance,
#             "study_hours": e.study_hours,
#             "attendance": e.attendance,
#             "assignment_worked": e.assignment_worked,
#             "sleep_hours": e.sleep_hours,
#             "stress_level": e.stress_level,
#             "social_media": e.social_media,
#         }
#         for e in entries
#     ]
# 
#     return jsonify({"entries": data})
# 
# 
# # --------------------------------
# # GET: Student progress summary
# # --------------------------------
# @progress_bp.route("/summary", methods=["GET"])
# def student_progress_summary():
#     """
#     Returns aggregated performance stats
#     Used in Student dashboard summary cards
#     """
# 
#     student_id = request.args.get("student_id")
# 
#     if not student_id:
#         return jsonify({"error": "student_id is required"}), 400
# 
#     q = StudentDailyPerformance.query.filter_by(student_id=student_id)
# 
#     total_days = q.count()
#     if total_days == 0:
#         return jsonify({"count": 0, "summary": {}})
# 
#     avg_score = db.session.query(
#         db.func.avg(StudentDailyPerformance.score)
#     ).filter_by(student_id=student_id).scalar()
# 
#     avg_attendance = db.session.query(
#         db.func.avg(StudentDailyPerformance.attendance)
#     ).filter_by(student_id=student_id).scalar()
# 
#     avg_sleep = db.session.query(
#         db.func.avg(StudentDailyPerformance.sleep_hours)
#     ).filter_by(student_id=student_id).scalar()
# 
#     return jsonify({
#         "count": total_days,
#         "avg_score": round(avg_score or 0, 2),
#         "avg_attendance": round(avg_attendance or 0, 2),
#         "avg_sleep_hours": round(avg_sleep or 0, 2),
#     })
