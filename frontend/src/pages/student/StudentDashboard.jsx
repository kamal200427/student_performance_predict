// frontend/src/pages/student/StudentDashboard.js

import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

// Student dashboard widgets
 
import AttendanceCard from "../../components/student/AttendanceCard";
import ProgressTracker from "../../components/student/ProgressTracker";
import InputForm from "../../components/student/InputForm";
import StudentSuggestionBox from "../../components/student/StudentSuggestionBox"; // ✅ NEW
//api call 
import {getStudentProgress} from "../../api/progress_dash"
/**
 * StudentDashboard
 * - Main dashboard for student users
 * - Shows prediction, attendance, progress analytics
 * - Displays teacher suggestions for this student
 */

export default function StudentDashboard() {
  const { user } = useAuth();
   const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
 useEffect(() => {
    if (!user?.id) return;

    const loadProgress = async () => {
      try {
        const data = await getStudentProgress(user.id);
        console.log(data);
        setProgress(data);
        
      } catch (err) {
        setError(err.message);
      }
       
    };

    loadProgress();
  }, [user?.id]);
  // 🔒 REQUIRED GUARDS
  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  // if (!progress) {
  //   return <Typography>Loading dashboard...</Typography>;
  // }
  return (
  <Box>
    {/* Header */}
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight={800}>
        Track your daily performance and learning progress

      </Typography>
      <Typography variant="body2" color="text.secondary">
         Check your pertformance
      </Typography>
    </Box>
    {progress && (
      <Grid container spacing={3} sx={{ mt: 1 }}>
    {/* Attendance */}
        <Grid item xs={12} md={4}>
          <AttendanceCard
            prop={progress?.latest?.attendance}
            averageprop={progress?.averages?.attendance}
            value1="Attendance"
            value2="Average Attendance"
          />
        </Grid>

        {/* Performance */}
        <Grid item xs={12} md={4}>
          <AttendanceCard
            prop={progress?.latest?.score}
            averageprop={progress?.averages?.score}
            value1="Every Day Performance"
            value2="Average Performance"
          />
        </Grid>
        </Grid>
    )}
    {/* INPUT FORM — ALWAYS VISIBLE */}
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <InputForm />
      </Grid>
    </Grid>

    {/* IF NO PROGRESS DATA */}
    {!progress && (
      <Box
        sx={{
          mt: 4,
          minHeight: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          No Performance Data Yet 📉
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Submit today’s data to unlock performance insights.
        </Typography>
      </Box>
    )}

    {/* DASHBOARD — ONLY WHEN DATA EXISTS */}
    {progress && (
      <Grid container spacing={3} sx={{ mt: 1 }}>
    
      {/* Charts */}
        <Grid item xs={12}>
          <ProgressTracker data={progress?.last_seven || []} />
        </Grid>
        {/* Suggestions */}
        <Grid item xs={12} md={6}>
          <StudentSuggestionBox />
        </Grid>
      </Grid>
    )}
  </Box>
);
}