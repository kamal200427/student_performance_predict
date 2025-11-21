import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import accuracy_score,confusion_matrix,classification_report
df=pd.read_csv(r'D:\student_performance\backend\student_performance.csv')
df.dropna(inplace=True)
df.columns
df = df.set_axis(['Student_ID','Age', 'Gender', 'Study_Hours_per_Week', 'Preferred_Learning_Style',
       'Online_Courses_Completed', 'Participation_in_Discussions',
       'Assignment_Completion_Rate', 'Exam_Score',
       'Attendance_Rate', 'Use_of_Educational_Tech',
       'Self_Reported_Stress_Level', 'Time_Spent_on_Social_Media',
       'Sleep_Hours_per_Night', 'Final_Grade'], axis=1)
from sklearn.preprocessing import LabelEncoder

le_gender = LabelEncoder()
le_style = LabelEncoder()
le_discussion = LabelEncoder()
le_tech = LabelEncoder()
le_grade = LabelEncoder()
le_level = LabelEncoder()
df['Gender'] = le_gender.fit_transform(df['Gender'])
df['Preferred_Learning_Style'] = le_style.fit_transform(df['Preferred_Learning_Style'])
df['Participation_in_Discussions'] = le_discussion.fit_transform(df['Participation_in_Discussions'])
df['Use_of_Educational_Tech'] = le_tech.fit_transform(df['Use_of_Educational_Tech'])
df['Self_Reported_Stress_Level'] = le_level.fit_transform(df['Self_Reported_Stress_Level'])

# Target column
df['Final_Grade'] = le_grade.fit_transform(df['Final_Grade'])
df = df.drop('Student_ID', axis=1)
x=df.drop('Final_Grade', axis=1)
y=df['Final_Grade']
from sklearn.model_selection import train_test_split

x_train, x_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42
)
from sklearn.ensemble import RandomForestRegressor

model = RandomForestRegressor(n_estimators=100)
model.fit(x_train, y_train)
# 6. Evaluate Model
# --------------------
y_pred = model.predict(x_test)

accuracy = accuracy_score(y_test, y_pred)
cm = confusion_matrix(y_test, y_pred)
cr = classification_report(y_test, y_pred)

print("🎯 Model Accuracy:", accuracy)
print("\n📌 Confusion Matrix:\n", cm)
print("\n📑 Classification Report:\n", cr)
bundle = {
    "model": model,
    "le_gender": le_gender,
    "le_style": le_style,
    "le_discussion": le_discussion,
    "le_tech": le_tech,
    "le_level": le_level,
    "le_grade": le_grade
}
import pickle
# Save Bundle
# -----------------------------
with open("model_bundle.pkl", "wb") as f:
    pickle.dump(bundle, f)

print("✔ model_bundle.pkl generated successfully!")