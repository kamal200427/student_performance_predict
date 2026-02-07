import pandas as pd
import pickle
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# ----------------------------
# Load dataset
# ----------------------------
df = pd.read_csv(r"D:\student_performance\backend\daily_student_performance.csv")

# ----------------------------
# Encode categorical features
# ----------------------------
le_gender = LabelEncoder()
le_participation = LabelEncoder()
le_tech = LabelEncoder()

df["Gender"] = le_gender.fit_transform(df["Gender"])
df["Participation_Today"] = le_participation.fit_transform(df["Participation_Today"])
df["Use_of_Educational_Tech_Today"] = le_tech.fit_transform(df["Use_of_Educational_Tech_Today"])

# Drop non-predictive fields
X = df.drop(columns=[
    "Student_ID",
    "Date",
    "Daily_Performance_Score"
])

y = df["Daily_Performance_Score"]

# ----------------------------
# Train-test split
# ----------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)

# ----------------------------
# Train Random Forest model
# ----------------------------
model = RandomForestRegressor(
    n_estimators=300,
    max_depth=12,
    min_samples_split=5,
    min_samples_leaf=3,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# ----------------------------
# Evaluation
# ----------------------------
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
r2 = r2_score(y_test, y_pred)

print("Model trained successfully")
print(f"MAE : {mae:.2f}")
print(f"R²  : {r2:.2f}")

# ----------------------------
# Save model bundle
# ----------------------------
bundle = {
    "model": model,
    "le_gender": le_gender,
    "le_participation": le_participation,
    "le_tech": le_tech,
    "features": X.columns.tolist()
}

with open("rf_daily_model.pkl", "wb") as f:
    pickle.dump(bundle, f)

print("Model saved as rf_daily_model.pkl")
