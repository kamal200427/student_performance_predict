// src/pages/Contact.js
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll contact you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>
      <p style={styles.subheading}>
        Have questions or suggestions? Send us a message and we'll get back to you.
      </p>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
  );
};

const styles = {
  container: { padding: "30px", textAlign: "center" },
  heading: { fontSize: "32px", color: "#f8f8f8ff" },
  subheading: { fontSize: "18px", marginBottom: "30px" },
  form: { display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" },
  input: { padding: "10px", width: "300px", borderRadius: "6px", border: "1px solid #ccc" },
  textarea: { padding: "10px", width: "300px", height: "120px", borderRadius: "6px", border: "1px solid #ccc" },
  button: { padding: "12px 25px", background: "#3090e4ff", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: "bold" },
};

export default Contact;
