import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import { motion } from "framer-motion";

import InputForm from "../components/InputForm";
import ProgressTracker from "../components/ProgressTracker";
import Chatbot from "../components/Chatbot";
import { useAuth } from "../context/AuthContext";

import StudentImg from "../assets/images/Student.png";

export default function Home() {
  const { user } = useAuth();
  const currentUserId = user?.id ?? "student_guest";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #faf7ff, #f0e6ff)",
        pt: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* ------------------------------------ */}
        {/* HERO SECTION */}
        {/* ------------------------------------ */}
        <Grid
          container
          spacing={6}
          alignItems="center"
          sx={{ py: { xs: 4, md: 8 } }}
        >
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: "#4c1d95",
                  mb: 2,
                  lineHeight: 1.2,
                }}
              >
                Unlock Smarter Learning With AI-Powered Insights
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: "1.15rem",
                  color: "text.secondary",
                  maxWidth: 480,
                }}
              >
                Predict performance, monitor progress, visualize learning
                patterns, and help students achieve meaningful academic success
                with AI assistance.
              </Typography>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
            <motion.img
              src={StudentImg}
              alt="Student Studying"
              style={{
                width: "90%",
                maxWidth: 480,
                filter: "drop-shadow(0px 12px 25px rgba(0,0,0,0.15))",
              }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            />
          </Grid>
        </Grid>

        {/* ------------------------------------ */}
        {/* FEATURE CARDS */}
        {/* ------------------------------------ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {[
              {
                title: "Student Progress",
                desc: "Track sleep, study time, stress levels, attendance, and exam performance instantly.",
        
              },
              {
                src:null,
                title: "Teacher Dashboard",
                desc: "Analyze student data to identify weaknesses, strengths, and improvement areas.",
                 
              },
              {
                title: "AI Predictions",
                desc: "Get intelligent performance predictions and behavior-based insights.",
        
              },
            ].map((card, i) => (
              <Grid item xs={12} md={4} key={i}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Box
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      background:
                        "linear-gradient(135deg, #ffffffdd, #f7f2ffdd)",
                      backdropFilter: "blur(10px)",
                      boxShadow: "0 20px 40px rgba(80,0,140,0.08)",
                      height: "100%",
                      textAlign: "center",
                    }}
                  >
                    <img
                      src={card.img}
                       
                      style={{ width: 189, marginBottom: 20 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
                      {card.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", lineHeight: 1.5 }}
                    >
                      {card.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* ------------------------------------ */}
        {/* AI PREDICTION FORM */}
        {/* ------------------------------------ */}
        <Box sx={{ mt: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <InputForm />
          </motion.div>
        </Box>

        {/* ------------------------------------ */}
        {/* PROGRESS TRACKER */}
        {/* ------------------------------------ */}
        <Box sx={{ mt: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProgressTracker studentId={currentUserId} apiBase="http://localhost:5000" />
          </motion.div>
        </Box>

        {/* ------------------------------------ */}
        {/* AI CHATBOT */}
        {/* ------------------------------------ */}
        <Box sx={{ mt: 12, mb: 10 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Chatbot studentId={currentUserId} apiBase="http://localhost:5000" />
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
}
