import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import InputForm from "../components/InputForm";
import ProgressTracker from "../components/ProgressTracker";
import { useAuth } from "../context/AuthContext";
import Chatbot from "../components/Chatbot";

export default function Home() {
  const { user, logout } = useAuth();
  // If no user, you can show a message or fallback to a temporary id.
  const currentUserId = user?.id ?? "student_guest"; // fallback for testing

  return (
    <Box>
      {/* Hero */}
      <Box sx={{ textAlign: "center", mb: 6, mt: { xs: 2, md: 4 } }}>
        <Typography variant="h3" sx={{ fontWeight: 900, color: "#0f172a" }}>
          Predict student performance, track learning progress, and help teachers & students excel
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary", mt: 1 }}>
          Fast predictions, actionable tips, and clear visualizations.
        </Typography>
      </Box>

      {/* Feature cards */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {[
          { title: "Students", desc: "Monitor progress, improve learning outcomes, and stay ahead academically." },
          { title: "Teachers", desc: "Analyze performance, provide guidance, and refine teaching strategies." },
          { title: "Features", desc: "Predict grades, track attendance, and monitor assignment completion." },
        ].map((c, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(250,250,255,0.95))",
                boxShadow: "0 14px 40px rgba(16,24,40,0.06)",
                height: "100%",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                {c.title}
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {c.desc}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Prediction form */}
      <Box sx={{ maxWidth: 980, mx: "auto" }}>
        <InputForm />
      </Box>

      {/* ---- Progress Tracker ---- */}
      <ProgressTracker
        studentId={currentUserId}
        apiBase="http://localhost:5000"
      />
      <Chatbot studentId={currentUserId} apiBase="http://localhost:5000" />
    </Box>
  );
}
