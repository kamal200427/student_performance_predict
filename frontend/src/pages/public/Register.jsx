import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  MenuItem,
  Alert,
} from "@mui/material";

const API_BASE = "http://127.0.0.1:5000";

export default function Register() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const roleFromUrl = params.get("role") || "student";

  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: roleFromUrl,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) =>{
    // console.log(e.target.name,e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
    
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);
      
      if (!res.ok) throw new Error(data.error);

      setSuccess("Registration successful! Redirecting to login...");
      setError(null);

      setTimeout(() => {
        navigate(`/login?role=${form.role}`);
      }, 1200);

    } catch (err) {
      setError(err.message);
      setSuccess(null);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Card sx={{ maxWidth: 460, width: "100%" }}>
        <CardContent>
          <Typography variant="h5" fontWeight={800}>
            Register
          </Typography>

          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField name="username" label="User ID" fullWidth required sx={{ mb: 2 }} onChange={handleChange} />
            <TextField name="name" label="Full Name" fullWidth required sx={{ mb: 2 }} onChange={handleChange} />
            <TextField name="email" label="Email" fullWidth required sx={{ mb: 2 }} onChange={handleChange} />
            <TextField name="password" label="Password" type="password" fullWidth required sx={{ mb: 2 }} onChange={handleChange} />

            <TextField select name="role" value={form.role} onChange={handleChange} fullWidth sx={{ mb: 3 }}>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
            </TextField>

            <Button type="submit" variant="contained" fullWidth>
              Register
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
