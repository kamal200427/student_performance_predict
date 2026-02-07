# backend/config.py

import os
from pathlib import Path

# -----------------------
# Base directory
# -----------------------
BASE_DIR = Path(__file__).resolve().parent

# -----------------------
# Flask settings
# -----------------------
DEBUG = os.getenv("FLASK_DEBUG", "True") == "True"
SECRET_KEY = os.getenv("SECRET_KEY", "dev-secret-key-change-this")

# -----------------------
# Database configuration
# -----------------------
DATABASE_NAME = os.getenv("DB_NAME", "student_performance.db")
SQLALCHEMY_DATABASE_URI = f"sqlite:///{BASE_DIR / DATABASE_NAME}"
SQLALCHEMY_TRACK_MODIFICATIONS = False

# -----------------------
# ML Model configuration
# -----------------------
MODEL_DIR = BASE_DIR / "ml"
MODEL_FILE = MODEL_DIR / "rf_daily_model.pkl"
MODEL_TRAIN_SCRIPT = MODEL_DIR / "model.py"

# -----------------------
# CORS configuration
# -----------------------
CORS_ORIGINS = os.getenv(
    "CORS_ORIGINS",
    "http://localhost:3000,http://127.0.0.1:3000"
).split(",")

# -----------------------
# API configuration
# -----------------------
API_PREFIX = "/api"

# -----------------------
# Teacher / Student logic
# -----------------------
LOW_SCORE_THRESHOLD = 40
GOOD_SCORE_THRESHOLD = 60
EXCELLENT_SCORE_THRESHOLD = 80

# -----------------------
# Pagination defaults
# -----------------------
DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 100
