import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ textAlign: "center", my: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: "#4A148C" }}>
        About This Project
      </Typography>

      <Typography
        variant="body1"
        sx={{ maxWidth: 900, mx: "auto", color: "#4E4E4E", mb: 4, lineHeight: 1.7 }}
      >
        This application predicts student academic performance by analyzing key factors such as
        study hours, attendance, assignments, sleep, social media usage, and more. Educators can
        monitor performance trends and take early action, while students can track their daily
        habits and improve focus, consistency, and learning effectiveness.
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, color: "#6A1B9A" }}>
        How Users Can Use This Project
      </Typography>

      <Box
        sx={{
          maxWidth: 920,
          mx: "auto",
          p: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #EDE7F6, #FFF3E0)",
          boxShadow: "0 10px 28px rgba(0,0,0,0.08)",
          mb: 6,
          textAlign: "left",
        }}
      >
        <Typography sx={{ fontSize: "1.1rem", mb: 1.5 }}>
          <b>1. Enter Student Data:</b> Add daily study hours, attendance, sleep duration, and other
          required inputs.
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", mb: 1.5 }}>
          <b>2. Get Performance Prediction:</b> The app instantly predicts performance using a
          trained machine learning model.
        </Typography>
        <Typography sx={{ fontSize: "1.1rem", mb: 1.5 }}>
          <b>3. Track Daily Progress:</b> Performance history gets stored and displayed visually
          using charts.
        </Typography>
        <Typography sx={{ fontSize: "1.1rem" }}>
          <b>4. Improve Learning:</b> Students receive insights on how daily habits affect academic
          outcomes.
        </Typography>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: "#4A148C" }}>
        Our Team
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {[
          { name: "Kamal Barman", role: "AI Developer" },
          { name: "Rupak Ghosh", role: "Frontend & UI Designer" },
          { name: "Sampriti Mondal", role: "Data Analyst" },
          { name: "Sourasish Singha", role: "Backend Developer" },
          { name: "Manoj Chini", role: "Database & Cloud Engineer" },
          { name: "Teacher Name", role: "Education Expert" },
        ].map((m, i) => (
          <Grid item xs={10} sm={4} key={i}>
            <Box
              sx={{
                p: 3,
                borderRadius: 3,
                background: "#FFFFFF",
                boxShadow: "0 12px 30px rgba(16,24,40,0.08)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 16px 40px rgba(16,24,40,0.15)",
                },
              }}
            >
              <Typography sx={{ fontWeight: 800, color: "#6A1B9A" }}>{m.name}</Typography>
              <Typography variant="body2" sx={{ color: "#616161" }}>{m.role}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
