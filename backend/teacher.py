from flask import Blueprint, jsonify

teacher_bp = Blueprint("teacher", __name__, url_prefix="/teacher")

@teacher_bp.route("/students", methods=["GET"])
def students():
    return jsonify({
        "students": ["kamal", "nj", "raj"]
    })

@teacher_bp.route("/performance", methods=["GET"])
def performance():
    return jsonify({
        "average_score": 72,
        "topper": "kamal"
    })
