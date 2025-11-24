import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer
} from "recharts";
import { Box, TextField, Button, Stack, Typography } from "@mui/material";

export default function ProgressTracker({ studentId = "student-1", apiBase = "http://localhost:5000" }) {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    study_hours: "",
    exam_score: "",
    attendance: "",
    stress_level: "",
    sleep_hours: ""
  });
  const [loading, setLoading] = useState(false);

  const fetchEntries = async () => {
    try {
      const res = await axios.get(`${apiBase}/progress`, { params: { student_id: studentId } });
      setEntries(
        res.data.entries.map((e) => ({
          ...e,
          date: e.date
        }))
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        student_id: studentId,
        date: form.date,
        study_hours: Number(form.study_hours || 0),
        exam_score: form.exam_score !== "" ? Number(form.exam_score) : null,
        attendance: form.attendance !== "" ? Number(form.attendance) : null,
        stress_level: form.stress_level !== "" ? Number(form.stress_level) : null,
        sleep_hours: form.sleep_hours !== "" ? Number(form.sleep_hours) : null
      };
      await axios.post(`${apiBase}/progress`, payload);
      setForm({
        ...form,
        study_hours: "",
        exam_score: "",
        attendance: "",
        stress_level: "",
        sleep_hours: ""
      });
      await fetchEntries();
    } catch (err) {
      console.error(err);
      alert("Failed to save entry");
    } finally {
      setLoading(false);
    }
  };

  // Prepare chart data sorted by date
  const chartData = [...entries]
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((e, i) => ({
      ...e,
      idx: i + 1 // unique index for bar charts
    }));

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Progress Tracker
      </Typography>

      {/* FORM */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2} alignItems="center">
          <TextField name="date" label="Date" type="date" value={form.date} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField name="study_hours" label="Study Hours" type="number" value={form.study_hours} onChange={handleChange} />
          <TextField name="exam_score" label="Exam Score (%)" type="number" value={form.exam_score} onChange={handleChange} />
          <TextField name="attendance" label="Attendance (%)" type="number" value={form.attendance} onChange={handleChange} />
          <TextField name="stress_level" label="Stress (1-10)" type="number" value={form.stress_level} onChange={handleChange} />
          <TextField name="sleep_hours" label="Sleep Hours" type="number" value={form.sleep_hours} onChange={handleChange} />
          <Button type="submit" variant="contained" disabled={loading}>
            Save
          </Button>
        </Stack>
      </Box>

      {/* LINE CHART */}
      <Box sx={{ height: 300, mb: 4 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
          dataKey="study_hours"
          label={{
          value: "Study Hours",
          position: "outsideBottom",
          // moves label closer or farther from axis
          dy: 10,        // pushes label downward to make it visible
          style: { fontSize: 14, fontWeight: 600 }
          }}
          />

            <YAxis
              yAxisId="left"
              label={{ value: "Exam score", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="exam_score" name="Exam Score" stroke="#0ea5a4" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* ATTENDANCE vs SLEEP BAR CHART */}
      <Box sx={{ height: 240, mb: 4 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="idx" label={{ value: "Student id", dy: 10 }} />
            <YAxis label={{ value: "%Attendance/Sleep Hours", angle: -90, position: "insideMiddle" ,dx: -10}} />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendance" name="Attendance (%)" fill="#ef4444" />
            <Bar dataKey="sleep_hours" name="Sleep (hrs)" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* NEW: ATTENDANCE vs EXAM SCORE BAR CHART */}
      <Box sx={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="attendance"
              label={{ value: "Attendance (%)", position: "insideBottom", dy: 10 }}
            />

            <YAxis
              label={{ value: "Exam Score (%)", angle: -90, position: "insideLeft" }}
            />

            <Tooltip />
            <Legend />

            <Bar dataKey="exam_score" name="Exam Score (%)" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
}
