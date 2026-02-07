"""
Routes package initializer

This file registers all API blueprints so they can be
easily imported into app.py.
"""

from .predict_routes import predict_bp
from .student_routes import student_bp
from .teacher_routes import teacher_bp
from .progress_routes import progress_bp

__all__ = [
    "predict_bp",
    "student_bp",
    "teacher_bp",
    "progress_bp",
]
