"""
helpers.py

General helper / utility functions that are NOT specific to:
- database models
- ML encoders
- routes

Used across routes, services, and business logic.
"""

from datetime import datetime, timezone


def current_utc_datetime():
    """
    Returns current UTC datetime.
    Centralized to avoid repeating datetime.utcnow() everywhere.
    """
    return datetime.now(timezone.utc)


def current_date():
    """
    Returns today's date in UTC.
    Useful for daily performance tracking.
    """
    return current_utc_datetime().date()


def current_time():
    """
    Returns current time in UTC.
    """
    return current_utc_datetime().time()


def grade_from_score(score: float) -> str:
    """
    Convert numeric score into performance grade.

    Args:
        score (float): prediction score (0–100)

    Returns:
        str: performance label
    """
    if score >= 80:
        return "Excellent"
    elif score >= 60:
        return "Good"
    elif score >= 40:
        return "Average"
    else:
        return "Poor"


def safe_round(value, digits=2):
    """
    Safely round a numeric value.
    Returns None if value is None.
    """
    if value is None:
        return None
    return round(float(value), digits)


def is_low_performer(score: float) -> bool:
    """
    Identify low-performing students.
    Used by teacher dashboard & suggestion logic.
    """
    return score < 40


def serialize_model(obj):
    """
    Convert SQLAlchemy model to dictionary.
    Prevents repeating to_dict() logic everywhere.

    Usage:
        serialize_model(db_object)
    """
    return {
        column.name: getattr(obj, column.name)
        for column in obj.__table__.columns
    }
