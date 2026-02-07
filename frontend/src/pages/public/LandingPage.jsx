// frontend/src/pages/public/LandingPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import InsightsIcon from "@mui/icons-material/Insights";
import GroupsIcon from "@mui/icons-material/Groups";

/**
 * LandingPage
 * - Public home page of the application
 * - Entry point for Students and Teachers
 */
export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #38bdf8 100%)",
        color: "white",
        py: 8,
      }}
    >
      <Container maxWidth="lg">
        {/* HERO SECTION */}
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography
            variant="h3"
            fontWeight={900}
            sx={{ mb: 2, letterSpacing: 0.5 }}
          >
            Student Performance Prediction System
          </Typography>

          <Typography
            variant="h6"
            sx={{ opacity: 0.9, maxWidth: 720, mx: "auto", mb: 4 }}
          >
            AI-powered platform that helps students track daily progress and
            enables teachers to analyze performance and provide timely guidance.
          </Typography>

          {/* 🔽 UPDATED CTA */}
          <Button
            variant="contained"
            size="large"
            sx={{ fontWeight: 700, px: 5, py: 1.4 }}
            onClick={() => navigate("/select-role")}
          >
            Get Started
          </Button>
        </Box>

        {/* FEATURES SECTION */}
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent>
                <SchoolIcon sx={{ fontSize: 48, color: "#2563eb" }} />
                <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
                  Student Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Students can check daily performance, attendance, study habits,
                  and visualize progress through interactive charts.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent>
                <InsightsIcon sx={{ fontSize: 48, color: "#0ea5a4" }} />
                <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
                  AI-Based Prediction
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Machine learning models analyze multiple factors to predict
                  academic performance more accurately than traditional methods.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ height: "100%", borderRadius: 3 }}>
              <CardContent>
                <GroupsIcon sx={{ fontSize: 48, color: "#22c55e" }} />
                <Typography variant="h6" fontWeight={700} sx={{ mt: 2 }}>
                  Teacher Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Teachers can monitor class performance, identify weak students,
                  and provide personalized suggestions for improvement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
