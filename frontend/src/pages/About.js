import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export default function About() {
  return (
    <Box sx={{ textAlign: "center", my: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: "#2b0d4a" }}>
        About This Project
      </Typography>

      <Typography variant="body1" sx={{ maxWidth: 880, mx: "auto", color: "text.secondary", mb: 4 }}>
        This application predicts student performance using data such as study hours, attendance,
        assignments, sleep, and social media usage. It helps teachers monitor students and guide them
        effectively while enabling students to track and improve their learning outcomes.
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        Our Team
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {[
          { name: "Kamal Barman", role: "AI Developer" },
          { name: "Teacher Name", role: "Education Expert" },
        ].map((m, i) => (
          <Grid item xs={10} sm={4} key={i}>
            <Box sx={{
              p: 3,
              borderRadius: 2,
              background: "white",
              boxShadow: "0 12px 30px rgba(16,24,40,0.05)",
            }}>
              <Typography sx={{ fontWeight: 800 }}>{m.name}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>{m.role}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
