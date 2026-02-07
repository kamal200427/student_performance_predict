from flask import Blueprint, request, jsonify

student_bp = Blueprint("student", __name__, url_prefix="/student")

@student_bp.route("/suggestions", methods=["GET"])
def suggestions():
    student_id = request.args.get("student_id")

    if not student_id:
        return jsonify({"error": "student_id required"}), 400

    return jsonify({
        "student_id": student_id,
        "suggestions": [
            "Improve attendance",
            "Practice weak subjects",
            "Revise daily"
        ]
    })


@student_bp.route("/progress", methods=["GET"])
def progress():
    student_id = request.args.get("student_id")

    return jsonify({
        "student_id": student_id,
        "progress": "Average"
    })
