from flask import Blueprint, request, jsonify
from models.user import User
from database.db import db

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")

# ---------------- REGISTER ----------------
@auth_bp.route("/register", methods=["POST"])
def register():
     
    data = request.json

    username = data.get("username")
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    if not all([username, name, email, password, role]):
        return jsonify({"error": "All fields are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already exists"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400
    
    # if User.query.filter_by(role=role).first():
    #     return jsonify({"error": "Sorry It is not login, check another one"}), 400

    user = User(
        username=username,
        name=name,
        email=email,
        role=role
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Registration successful"}), 201


# ---------------- LOGIN ----------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    role=data.get("role")
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password or not role:
        return jsonify({"error": "Missing credentials"}), 400
    
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({"error": "User not found"}), 401

    if not user.check_password(password):
        return jsonify({"error": "Incorrect password"}), 401
    
    # 3️⃣ Check role
    if user.role != role:
        return jsonify({"error": "Role mismatch"}), 403

    return jsonify({
        "message": "Login successful",
        "role": user.role,
        "user": {
            "id": user.id,
            "username": user.username,
            "name": user.name,
            "email": user.email
        }
    })
@auth_bp.route("/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json()

    username = data.get("username")
    new_password = data.get("new_password")

    if not username or not new_password:
        return jsonify({
            "error": "username and new_password are required"
        }), 400

    # 🔍 Find user by username
    user = User.query.filter_by(username=username).first()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    # 🔐 Update password
    user.set_password(new_password)
    db.session.commit()

    return jsonify({
        "message": "Password reset successful"
    }), 200