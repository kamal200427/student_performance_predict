# backend/models/__init__.py

"""
Models package initializer

This file:
1. Makes the models folder a Python package
2. Exposes database models for easy importing
"""

from database.db import db
from .performance import StudentDailyPerformance


__all__ = [
    "db",
    "StudentDailyPerformance",
]
