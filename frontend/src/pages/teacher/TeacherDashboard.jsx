// frontend/src/pages/teacher/TeacherDashboard.js
import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

import PerformanceChart from "../../components/teacher/PerformanceChart";
import StudentTable from "../../components/teacher/StudentTable";
import SuggestionBox from "../../components/teacher/SuggestionBox";

import { getallStudentPerformance } from "../../api/teacher";

export default function TeacherDashboard() {
  const { user } = useAuth();

  const [result, setResult] = useState(null);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [error, setError] = useState(null);

  // ✅ derive students safely
  const students = result?.latest_performances || [];

  const toggleStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  useEffect(() => {
    if (!user?.id) return;

    const loadProgress = async () => {
      try {
        const data = await getallStudentPerformance();
        setResult(data);
         console.log(data);
         
        
      } catch (err) {
        setError(err.message);
      }
    };

    loadProgress();
  }, [user?.id]);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography fontSize={20} variant="body2" fontWeight={800}>
          Monitor student performance and provide guidance👋
        </Typography>
      </Box>

      {error && <Typography color="error">{error}</Typography>}


      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <PerformanceChart result={result} />
        </Grid>

        <Grid item xs={12} md={4}>
          <SuggestionBox
            selectedStudents={selectedStudents}
            lowPerformingStudents={students}
          />
        </Grid>

        <Grid item xs={12}>
          <StudentTable
            students={students}
            selectedStudents={selectedStudents}
            onToggleStudent={toggleStudent}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
