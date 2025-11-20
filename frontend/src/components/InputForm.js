import React, { useState } from "react";
import predict from "../api/predict";

const InputForm = () => {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Study_Hours_per_Week: "",
    Preferred_Learning_Style: "",
    Online_Courses_Completed: "",
    Participation_in_Discussions: "",
    Assignment_Completion_Rate: "",
    Exam_Score: "",
    Attendance_Rate: "",
    Use_of_Educational_Tech: "",
    Self_Reported_Stress_Level: "",
    Time_Spent_on_Social_Media: "",
    Sleep_Hours_per_Night: "",
  });

  const [prediction, setPrediction] = useState(null); // NEW: store predicted result
  const [loading, setLoading] = useState(false); // optional: show loading
  const [error, setError] = useState(null); // optional: show error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const formattedData = {
        ...formData,
        Age: Number(formData.Age),
        Study_Hours_per_Week: Number(formData.Study_Hours_per_Week),
        Online_Courses_Completed: Number(formData.Online_Courses_Completed),
        Assignment_Completion_Rate: Number(formData.Assignment_Completion_Rate),
        Exam_Score: Number(formData.Exam_Score),
        Attendance_Rate: Number(formData.Attendance_Rate),
        Time_Spent_on_Social_Media: Number(formData.Time_Spent_on_Social_Media),
        Sleep_Hours_per_Night: Number(formData.Sleep_Hours_per_Night),
      };

      const predictionResult = await predict(formattedData);
      setPrediction(predictionResult); // display prediction in UI
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>🎓 Student Performance Prediction</h2>

        <div style={styles.grid}>
          {/* AGE */}
          <label style={styles.label}>Age</label>
          <input
            type="number"
            name="Age"
            value={formData.Age}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* GENDER */}
          <label style={styles.label}>Gender</label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          {/* STUDY HOURS */}
          <label style={styles.label}>Study Hours / Week</label>
          <input
            type="number"
            name="Study_Hours_per_Week"
            value={formData.Study_Hours_per_Week}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* LEARNING STYLE */}
          <label style={styles.label}>Preferred Learning Style</label>
          <select
            name="Preferred_Learning_Style"
            value={formData.Preferred_Learning_Style}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select</option>
            <option value="Visual">Visual</option>
            <option value="Auditory">Auditory</option>
            <option value="Reading/Writing">Reading / Writing</option>
            <option value="Kinesthetic">Kinesthetic</option>
          </select>

          {/* ONLINE COURSES */}
          <label style={styles.label}>Online Courses Completed</label>
          <input
            type="number"
            name="Online_Courses_Completed"
            value={formData.Online_Courses_Completed}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* DISCUSSION */}
          <label style={styles.label}>Participation in Discussions</label>
          <select
            name="Participation_in_Discussions"
            value={formData.Participation_in_Discussions}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {/* ASSIGNMENT */}
          <label style={styles.label}>Assignment Completion (%)</label>
          <input
            type="number"
            name="Assignment_Completion_Rate"
            value={formData.Assignment_Completion_Rate}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* EXAM SCORE */}
          <label style={styles.label}>Exam Score (%)</label>
          <input
            type="number"
            name="Exam_Score"
            value={formData.Exam_Score}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* ATTENDANCE */}
          <label style={styles.label}>Attendance (%)</label>
          <input
            type="number"
            name="Attendance_Rate"
            value={formData.Attendance_Rate}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* TECH */}
          <label style={styles.label}>Use of Educational Tech</label>
          <select
            name="Use_of_Educational_Tech"
            value={formData.Use_of_Educational_Tech}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {/* STRESS */}
          <label style={styles.label}>Stress Level</label>
          <select
            name="Self_Reported_Stress_Level"
            value={formData.Self_Reported_Stress_Level}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* SOCIAL MEDIA */}
          <label style={styles.label}>Social Media (hrs/week)</label>
          <input
            type="number"
            name="Time_Spent_on_Social_Media"
            value={formData.Time_Spent_on_Social_Media}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* SLEEP */}
          <label style={styles.label}>Sleep Hours / Night</label>
          <input
            type="number"
            name="Sleep_Hours_per_Night"
            value={formData.Sleep_Hours_per_Night}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {/* Display Prediction */}
      {prediction && (
        <div style={styles.result}>
          <h3>🎯 Predicted Grade:</h3>
          <p>{prediction}</p>
        </div>
      )}

      {/* Display Error */}
      {error && (
        <div style={{ ...styles.result, color: "red" }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  form: {
    padding: "25px",
    background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#1a237e",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },
  label: {
    fontWeight: "bold",
    color: "#0d47a1",
  },
  input: {
    padding: "9px",
    border: "1px solid #90caf9",
    borderRadius: "6px",
    outline: "none",
  },
  button: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "#1e88e5",
    color: "white",
    fontSize: "18px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  result: {
    marginTop: "20px",
    padding: "15px",
    background: "#e8f5e9",
    borderRadius: "10px",
    textAlign: "center",
    fontSize: "20px",
    color: "#2e7d32",
    fontWeight: "bold",
  },
};

export default InputForm;
