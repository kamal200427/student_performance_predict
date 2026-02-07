// frontend/src/pages/public/Login.js
import { login as loginAPI } from "../../api/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
/**
 * Login Page
 * - Handles Student & Teacher login
 * - Role is passed via query param (?role=student|teacher)
 */
export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [params] = useSearchParams();
  const uiRole = params.get("role") || "student";

  const [form, setForm] = useState({
    role:"",
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

   const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (!form.username || !form.password) {
    setError("Please enter username and password");
    return;
  }

  try {
    // 🔥 CALL BACKEND
    const result = await loginAPI({
      username: form.username,
      password: form.password,
      role: uiRole,
    });

    // 🔥 SAVE AUTH STATE
    login({
      id: form.username,
      name: form.username,
      role: result.role,
    });

    // 🔥 REDIRECT
    if (uiRole === "teacher") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/dashboard");
    }

  } catch (err) {
    setError(err.message);
  }
};


  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
      <Card sx={{ maxWidth: 420, width: "100%", borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={800} sx={{ mb: 1 }}>
            {uiRole === "teacher" ? "Teacher Login" : "Student Login"}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Enter your credentials to continue
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label={uiRole === "teacher" ? "Teacher ID" : "Student ID"}
              name="username"
              value={form.username}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.2, fontWeight: 700 }}
            >
              Login
            </Button>
          </Box>

          {/* 🔽 ADDED REGISTER LINK */}
          <Typography
            variant="body2"
            sx={{
              mt: 3,
              textAlign: "center",
              cursor: "pointer",
              color: "primary.main",
            }}
            onClick={() => navigate(`/register?role=${uiRole}`)}
          >
            Don’t have an account? <strong>Register now</strong>
          </Typography>

        </CardContent>
      </Card>
    </Box>
  );
}
