"""
encoders.py

Utility functions related to encoding categorical values
and safely handling ML encoders (LabelEncoder, OneHot, etc.).
"""

import logging

logger = logging.getLogger(__name__)


def safe_label_transform(label_encoder, value, field_name: str):
    """
    Safely transform a categorical value using a fitted LabelEncoder.

    If an unseen category is received, it falls back to the first
    known class instead of crashing the API.

    Args:
        label_encoder: fitted sklearn LabelEncoder
        value (str): incoming categorical value
        field_name (str): field name for logging

    Returns:
        int: encoded value
    """
    try:
        return int(label_encoder.transform([value])[0])
    except Exception:
        logger.warning(
            "Unknown category '%s' for field '%s'. Falling back to default.",
            value,
            field_name,
        )
        # fallback → first known class
        try:
            return int(label_encoder.transform([label_encoder.classes_[0]])[0])
        except Exception:
            return 0


def to_float_safe(value, field_name: str):
    """
    Convert value to float safely.

    Raises a ValueError with clear message if conversion fails.
    """
    try:
        return float(value)
    except (TypeError, ValueError):
        raise ValueError(
            f"Field '{field_name}' must be numeric. Got '{value}'."
        )


def normalize_binary(value):
    """
    Normalize Yes/No or True/False to 1 or 0.
    Useful for features like EdTech usage.
    """
    if isinstance(value, str):
        value = value.lower().strip()
        if value in ("yes", "true", "1"):
            return 1
        if value in ("no", "false", "0"):
            return 0
    return int(bool(value))
