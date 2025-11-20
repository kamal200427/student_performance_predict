// src/pages/About.js
import React from "react";

const About = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>About This Project</h1>
      <p style={styles.subheading}>
        This application predicts student performance using data such as study hours, attendance, assignments, sleep, and social media usage. It helps teachers monitor students and guide them effectively while enabling students to track and improve their learning outcomes.
      </p>

      <h2 style={{ marginTop: "40px" }}>Our Team</h2>
      <div style={styles.team}>
        <TeamCard name="Kamal Barman" role="AI Developer" img="https://via.placeholder.com/120" />
        <TeamCard name="Teacher Name" role="Education Expert" img="https://via.placeholder.com/120" />
      </div>
    </div>
  );
};

const TeamCard = ({ name, role, img }) => (
  <div style={styles.card}>
    <img src={img} alt={name} style={{ ...styles.img, borderRadius: "50%" }} />
    <h4>{name}</h4>
    <p>{role}</p>
  </div>
);

const styles = {
  container: { padding: "30px", textAlign: "center" },
  heading: { fontSize: "32px", color: "#1a237e" },
  subheading: { fontSize: "18px", marginBottom: "30px" },
  team: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px" },
  card: { width: "180px", padding: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", borderRadius: "10px" },
  img: { width: "100%" },
};

export default About;
