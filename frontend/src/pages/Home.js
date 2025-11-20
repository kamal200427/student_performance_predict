// src/pages/Home.js
import React from "react";
import InputForm from "../components/InputForm";

const Home = ({onResult, result}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎓 Student Performance Predictor</h1>
      <p style={styles.subheading}>
        Predict student performance, track learning progress, and help students and teachers excel!
      </p>

      <div style={styles.features}>
        <FeatureCard
          title="Students"
          description="Monitor progress, improve learning outcomes, and stay ahead academically."
          img="https://via.placeholder.com/150"
        />
        <FeatureCard
          title="Teachers"
          description="Analyze student performance, provide guidance, and enhance teaching strategies."
          img="https://via.placeholder.com/150"
        />
        <FeatureCard
          title="Features"
          description="Predict grades, track attendance, assignments, and social engagement."
          img="https://via.placeholder.com/150"
        />
      </div>

       <div style={styles.container}>
      <h1>🎓 Student Performance Predictor</h1>
      <p>Predict student performance using multiple metrics!</p>

      <InputForm onResult={onResult} />

      {result && (
        <div style={styles.resultBox}>
          <h3>📊 Prediction Result</h3>
          <p>Predicted Grade: <b>{result}</b></p>
        </div>
      )}
    </div>
    </div>
  );
};

const FeatureCard = ({ title, description, img }) => (
  <div style={styles.card}>
    <img src={img} alt={title} style={styles.img} />
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const styles = {
  container: { padding: "30px", textAlign: "center" },
  heading: { fontSize: "32px", color: "#eceef8ff" },
  subheading: { fontSize: "18px", marginBottom: "30px" },
  features: { display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: "20px" },
  card: { width: "250px", padding: "15px", boxShadow: "0 4px 12px rgba(241, 241, 241, 0.99)",color:"rgba(243, 243, 243, 1)", borderRadius: "10px" },
  img: { width: "100%", borderRadius: "10px", marginBottom: "10px" },
  resultBox: {
    marginTop: "20px",
    padding: "15px",
    background: "#e8f0fe",
    borderRadius: "10px",
    borderLeft: "5px solid #2575fc",
  },
};

export default Home;
