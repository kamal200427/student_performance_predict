# 🎓 Student Performance Prediction System

A full-stack Machine Learning application built using **React (frontend)** and **Flask (backend)**.  
This project predicts a student's academic performance (grade category) based on input features such as study hours, learning style, participation, and more.

---

## 🚀 Features

### ⭐ Frontend (React)
- Clean, responsive UI  
- Pages included:
  - **Home** – Project introduction, images, and features  
  - **About** – Tech stack + ML model workflow  
  - **Contact** – Simple contact information page  
- Input form for student details  
- Fetch API–based communication with backend  
- Displays prediction result instantly  
- Modular structure for easy maintenance  

### 🔥 Backend (Flask)
- Receives student input JSON  
- Preprocesses data  
- Loads ML model (`model.pkl`)  
- Predicts student grade  
- Returns output as JSON  
- CORS enabled  

### 🧠 Machine Learning Model
- Trained using real student performance dataset  
- Algorithm options used: Random Forest / XGBoost  
- Predicts performance category:
  - **A**, **B**, **C**, **D**, **Fail**

---

## 🗂️ Project Structure

project/
│
├── backend/
│ ├── app.py
│ ├── model.pkl
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ │ ├── api/predict.js
│ │ ├── components/InputForm.js
│ │ ├── pages/Home.js
│ │ ├── pages/About.js
│ │ ├── pages/Contact.js
│ │ └── App.js
│ └── package.json
│
└── README.md

---

## ⚙️ Installation & Setup

### **1️⃣ Backend Setup**
```bash
cd backend
pip install -r requirements.txt
python app.py
### **2 Forntend Setup**

cd frontend
npm install
npm start
