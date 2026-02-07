# backend/ml/model_loader.py

import os
import pickle
import logging

logger = logging.getLogger(__name__)

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "rf_daily_model.pkl"
)

_cached_bundle = None


def load_model_bundle():
    """
    Loads ML model, encoders, and feature list.
    Uses caching so model loads only once.
    """

    global _cached_bundle

    if _cached_bundle is not None:
        return _cached_bundle

    if not os.path.exists(MODEL_PATH):
        raise FileNotFoundError(
            f"Model file not found at {MODEL_PATH}. "
            "Run model.py to generate rf_daily_model.pkl"
        )

    logger.info("Loading ML model bundle from %s", MODEL_PATH)

    with open(MODEL_PATH, "rb") as f:
        bundle = pickle.load(f)

    model = bundle["model"]
    features = bundle["features"]

    encoders = {
        "gender": bundle["le_gender"],
        "participation": bundle["le_participation"],
        "edtech": bundle["le_tech"],
    }

    _cached_bundle = (model, encoders, features)
    return _cached_bundle
