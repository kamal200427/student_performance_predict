// frontend/src/components/student/ProgressTracker.js

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Box, Typography, Grid, Card } from "@mui/material";

export default function ProgressTracker({ data }) {

  // Loading
  if (data === null) {
    return <Typography>Loading progress...</Typography>;
  }

  // No data
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Typography color="text.secondary">
        No performance data available yet.
      </Typography>
    );
  }

  // Prepare chart data
  const chartData = data
    .map((item) => ({
      date: item.date,
      score: Number(item.score.toFixed(1)),
      studyHours: item.study_hours,
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 3 }}>
        Performance Progress
      </Typography>

      <Grid container spacing={4}>

        {/* 📈 EXAM SCORE OVER TIME */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 420 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Exam Score Over Time
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Date",
                    position: "insideBottom",
                    dy: 10,
                  }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Score (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#1976d2"
                  strokeWidth={4}
                  dot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

        {/* 📊 STUDY HOURS vs EXAM SCORE */}
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: 420 }}>
            <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
              Study Hours vs Exam Score
            </Typography>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="studyHours"
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Study Hours",
                    position: "insideBottom",
                    dy: 10,
                  }}
                />
                <YAxis
                  domain={[0, 100]}
                  tick={{ fontSize: 12 }}
                  label={{
                    value: "Score (%)",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip />
                <Bar
                  dataKey="score"
                  fill="#4caf50"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Grid>

      </Grid>
    </Box>
  );
}
