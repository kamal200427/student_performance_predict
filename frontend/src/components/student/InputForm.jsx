import React, { useState } from "react";
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
import predict from "../../api/predict";
import { useAuth } from "../../context/AuthContext";   // ✅ ADDED

export default function InputForm() {
  const { user } = useAuth();   // ✅ GET LOGGED-IN USER

  const [formData, setFormData] = useState({
    Age: "",
    Gender: "",
    Study_Hours_Today: "",
    Attendance_Today: "",
    Assignment_Worked_Today: "",
    Sleep_Hours_Last_Night: "",
    Stress_Level_Today: "",
    Time_Spent_on_Social_Media_Today: "",
    Participation_Today: "",
    Use_of_Educational_Tech_Today: "",
  });

  const [score, setScore] = useState(null);
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setScore(null);
    setPerformance(null);
     
    if (!formData.Age || !formData.Gender) {
      setError("Age and Gender are required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        student_id: user?.id || "guest",     // ✅ IMPORTANT FIX

        Age: Number(formData.Age),
        Gender: formData.Gender,
        Study_Hours_Today: Number(formData.Study_Hours_Today || 0),
        Attendance_Today: Number(formData.Attendance_Today || 0),
        Assignment_Worked_Today: Number(formData.Assignment_Worked_Today || 0),
        Sleep_Hours_Last_Night: Number(formData.Sleep_Hours_Last_Night || 0),
        Stress_Level_Today: Number(formData.Stress_Level_Today || 0),
        Time_Spent_on_Social_Media_Today: Number(
          formData.Time_Spent_on_Social_Media_Today || 0
        ),
        Participation_Today: formData.Participation_Today,
        Use_of_Educational_Tech_Today: formData.Use_of_Educational_Tech_Today,
      };

      const res = await predict(payload);

      setScore(res.score);
      setPerformance(res.predicted_grade);
  
    } catch (err) {
      setError(err?.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card sx={{ borderRadius: 3 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <SchoolIcon />
          </Avatar>
          <Typography variant="h5" fontWeight={800}>
            Daily Student Performance Check
          </Typography>
        </Stack>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={2}>

            <Grid item={{xs:12,sm:3}}>
              <TextField
                label="Age"
                name="Age"
                type="number"
                value={formData.Age}
                onChange={handleChange}
                required
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item={{xs:12,sm:3}}>
              <TextField
                label="Gender"
                name="Gender"
                select
                value={formData.Gender}
                onChange={handleChange}
                required
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </TextField>
            </Grid>

            <Grid item={{xs:12,sm:3}}>
              <TextField
                label="Study Hours Today"
                name="Study_Hours_Today"
                type="number"
                value={formData.Study_Hours_Today}
                onChange={handleChange}
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

            <Grid item={{xs:12,sm:4}}>
              <TextField
                label="Attendance Today (%)"
                name="Attendance_Today"
                type="number"
                value={formData.Attendance_Today}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item={{ xs:12,sm:4}}>
              <TextField
                label="Assignment Worked (%)"
                name="Assignment_Worked_Today"
                type="number"
                value={formData.Assignment_Worked_Today}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item ={{xs:12,sm:4}}>
              <TextField
                label="Sleep Hours Last Night"
                name="Sleep_Hours_Last_Night"
                type="number"
                value={formData.Sleep_Hours_Last_Night}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item ={{xs:12,sm:4}}>
              <TextField
                label="Stress Level Today"
                name="Stress_Level_Today"
                select
                value={formData.Stress_Level_Today}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value={1}>Low</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>High</MenuItem>
              </TextField>
            </Grid>

            <Grid item={{xs:12,sm:4}}>
              <TextField
                label="Social Media (hrs)"
                name="Time_Spent_on_Social_Media_Today"
                type="number"
                value={formData.Time_Spent_on_Social_Media_Today}
                onChange={handleChange}
                fullWidth
              />
            </Grid>

            <Grid item={{xs:12, sm:4}}>
              <TextField
                label="Participation Today"
                name="Participation_Today"
                select
                value={formData.Participation_Today}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </TextField>
            </Grid>

            <Grid item ={{xs:12,sm:4}}>
              <TextField
                label="Uses EdTech Today"
                name="Use_of_Educational_Tech_Today"
                select
                value={formData.Use_of_Educational_Tech_Today}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value="">Select</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                startIcon={
                  loading ? <CircularProgress size={18} /> : <PollIcon />
                }
                disabled={loading}
              >
                {loading ? "Predicting..." : "Check Today's Performance"}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {score !== null && performance !== null && (
          <Alert severity="success" sx={{ mt: 2 }}>
            <div>
              Daily Performance Score: <strong>{score.toFixed(2)}</strong> / 100
            </div>
            <div>
              Performance Level: <strong>{performance}</strong>
            </div>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

 
