import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  Stack,
  Avatar,
  Box,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PollIcon from "@mui/icons-material/Poll";
import ScoreIcon from "@mui/icons-material/Score";
import predict from "../api/predict";

/**
 * Clean, modern InputForm:
 * - outlined TextFields (labels visible)
 * - helpful placeholders and example helperText
 * - consistent spacing and responsive layout
 * - colored result banner (green/orange/red) with icon
 */

export default function InputForm({ onResult }) {
  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Study_Hours_per_Week: "",
    Preferred_Learning_Style: "",
    Online_Courses_Completed: "",
    Participation_in_Discussions: "",
    Assignment_Completion_Rate: "",
    Exam_Score: "",
    Attendance_Rate: "",
    Use_of_Educational_Tech: "",
    Self_Reported_Stress_Level: "",
    Time_Spent_on_Social_Media: "",
    Sleep_Hours_per_Night: "",
  });

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const validate = (d) => {
    if (!d.Age || Number(d.Age) <= 0) return "Please enter a valid age (e.g. 18).";
    if (d.Assignment_Completion_Rate !== "" && (Number(d.Assignment_Completion_Rate) < 0 || Number(d.Assignment_Completion_Rate) > 100))
      return "Assignment Completion must be 0–100.";
    if (d.Exam_Score !== "" && (Number(d.Exam_Score) < 0 || Number(d.Exam_Score) > 100))
      return "Exam Score must be 0–100.";
    if (d.Attendance_Rate !== "" && (Number(d.Attendance_Rate) < 0 || Number(d.Attendance_Rate) > 100))
      return "Attendance must be 0–100.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);

    const formatted = {
      ...formData,
      // cast numeric fields only; keep empty fields as 0 for predict but validate first
      Age: Number(formData.Age),
      Study_Hours_per_Week: formData.Study_Hours_per_Week === "" ? 0 : Number(formData.Study_Hours_per_Week),
      Online_Courses_Completed: formData.Online_Courses_Completed === "" ? 0 : Number(formData.Online_Courses_Completed),
      Assignment_Completion_Rate: formData.Assignment_Completion_Rate === "" ? 0 : Number(formData.Assignment_Completion_Rate),
      Exam_Score: formData.Exam_Score === "" ? 0 : Number(formData.Exam_Score),
      Attendance_Rate: formData.Attendance_Rate === "" ? 0 : Number(formData.Attendance_Rate),
      Time_Spent_on_Social_Media: formData.Time_Spent_on_Social_Media === "" ? 0 : Number(formData.Time_Spent_on_Social_Media),
      Sleep_Hours_per_Night: formData.Sleep_Hours_per_Night === "" ? 0 : Number(formData.Sleep_Hours_per_Night),
    };

    const v = validate(formatted);
    if (v) {
      setError(v);
      return;
    }

    try {
      setLoading(true);
      const res = await predict(formatted);
      // normalize response
      const normalized = typeof res === "string" || typeof res === "number" ? res : res?.prediction ?? res?.result ?? res;
      setPrediction(normalized);
      onResult && onResult(normalized);
    } catch (err) {
      setError(err?.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  };

  // helper for colored result
  const resultStyle = (pred) => {
    if (!pred) return { bgcolor: "transparent", color: "text.primary", icon: null };
    // Example mapping — adjust to your grading scheme
    const p = String(pred).toUpperCase();
    if (["A+", "A", "B+"].includes(p)) return { bgcolor: "rgba(16,185,129,0.12)", color: "#047857", icon: "✅" };
    if (["B", "C", "C+"].includes(p)) return { bgcolor: "rgba(250,204,21,0.12)", color: "#92400e", icon: "🎯" };
    return { bgcolor: "rgba(239,68,68,0.12)", color: "#b91c1c", icon: "⚠️" };
  };

  const resStyle = resultStyle(prediction);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 18px 40px rgba(15,23,42,0.08)" }}>
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
            <SchoolIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <div>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>
              Student Performance Prediction
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mt: 0.5 }}>
              Enter the student profile — examples are shown as placeholders.
            </Typography>
          </div>
        </Stack>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* row 1 */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Age"
                name="Age"
                type="number"
                placeholder="e.g. 20"
                value={formData.Age}
                onChange={handleChange}
                helperText="Student's age"
                variant="outlined"
                fullWidth
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Gender"
                name="Gender"
                select
                value={formData.Gender}
                onChange={handleChange}
                helperText="Select gender"
                variant="outlined"
                fullWidth
                required
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Study Hours / Week"
                name="Study_Hours_per_Week"
                type="number"
                placeholder="e.g. 12"
                value={formData.Study_Hours_per_Week}
                onChange={handleChange}
                helperText="Hours spent studying per week"
                variant="outlined"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccessTimeIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Learning Style"
                name="Preferred_Learning_Style"
                select
                value={formData.Preferred_Learning_Style}
                onChange={handleChange}
                helperText="Visual / Auditory / Reading / Kinesthetic"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Visual">Visual</MenuItem>
                <MenuItem value="Auditory">Auditory</MenuItem>
                <MenuItem value="Reading/Writing">Reading / Writing</MenuItem>
                <MenuItem value="Kinesthetic">Kinesthetic</MenuItem>
              </TextField>
            </Grid>

            {/* row 2 */}
            <Grid item xs={12} sm={4}>
              <TextField
                label="Online Courses Completed"
                name="Online_Courses_Completed"
                type="number"
                placeholder="e.g. 3"
                value={formData.Online_Courses_Completed}
                onChange={handleChange}
                helperText="Number of completed online courses"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Participation"
                name="Participation_in_Discussions"
                select
                value={formData.Participation_in_Discussions}
                onChange={handleChange}
                helperText="Active in discussions?"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Assignments (%)"
                name="Assignment_Completion_Rate"
                type="number"
                placeholder="e.g. 85"
                value={formData.Assignment_Completion_Rate}
                onChange={handleChange}
                helperText="Completion rate (0–100)"
                variant="outlined"
                fullWidth
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Exam Score (%)"
                name="Exam_Score"
                type="number"
                placeholder="e.g. 72"
                value={formData.Exam_Score}
                onChange={handleChange}
                helperText="Recent exam score"
                variant="outlined"
                fullWidth
                inputProps={{ min: 0, max: 100 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ScoreIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <TextField
                label="Attendance (%)"
                name="Attendance_Rate"
                type="number"
                placeholder="e.g. 90"
                value={formData.Attendance_Rate}
                onChange={handleChange}
                helperText="Class attendance rate"
                variant="outlined"
                fullWidth
                inputProps={{ min: 0, max: 100 }}
              />
            </Grid>

            {/* row 3 */}
            <Grid item xs={12} sm={3}>
              <TextField
                label="Use of EdTech"
                name="Use_of_Educational_Tech"
                select
                value={formData.Use_of_Educational_Tech}
                onChange={handleChange}
                helperText="Uses learning platforms?"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Stress Level"
                name="Self_Reported_Stress_Level"
                select
                value={formData.Self_Reported_Stress_Level}
                onChange={handleChange}
                helperText="High / Medium / Low"
                variant="outlined"
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Social Media (hrs/week)"
                name="Time_Spent_on_Social_Media"
                type="number"
                placeholder="e.g. 14"
                value={formData.Time_Spent_on_Social_Media}
                onChange={handleChange}
                helperText="Time spent on social media"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                label="Sleep Hours / Night"
                name="Sleep_Hours_per_Night"
                type="number"
                placeholder="e.g. 7"
                value={formData.Sleep_Hours_per_Night}
                onChange={handleChange}
                helperText="Average sleep hours"
                variant="outlined"
                fullWidth
              />
            </Grid>

            {/* CTA */}
            <Grid item xs={12} sx={{ mt: 1 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ px: 4, py: 1.6, fontWeight: 800 }}
                  startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <PollIcon />}
                  disabled={loading}
                >
                  {loading ? "Predicting..." : "Predict Performance"}
                </Button>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Tip: fill Age, Exam Score and Assignments for a better prediction.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* result / error */}
        <Box sx={{ mt: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}

          {prediction !== null && (
            <Box
              sx={{
                mt: 1,
                p: 2,
                borderRadius: 2,
                backgroundColor: resStyle.bgcolor,
                color: resStyle.color,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <Typography sx={{ fontWeight: 800, fontSize: 16 }}>
                {resStyle.icon} Predicted Grade: <span style={{ marginLeft: 8 }}>{prediction}</span>
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

InputForm.propTypes = {
  onResult: PropTypes.func,
};
