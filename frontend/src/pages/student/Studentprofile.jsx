import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockResetIcon from "@mui/icons-material/LockReset";
import { useAuth } from "../../context/AuthContext";
import { getStudentProfile } from "../../api/Profile_data";
import { resetpass } from "../../api/predict";

export default function Profile() {
  const { user, role } = useAuth();

  const [profileData, setProfileData] = useState(null);
  const [open, setOpen] = useState(false);
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
   
  // 🔹 Fetch profile for BOTH student & teacher
  useEffect(() => {
  if (!user?.id || !role) return;

  const loadProfile = async () => {
    try {
      const data = await getStudentProfile({
    studentId: user.id,
    role: role,
    });

      setProfileData(data);
    } catch (err) {
      setError(err.message || "Failed to load profile");
    }
  };

  loadProfile();
}, [user?.id, role]);

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleResetPassword = async () => {
    setError(null);
    setSuccess(null);

    if (!passwords.newPassword || !passwords.confirmPassword) {
      setError("All fields are required");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {
      username: user.id,
      new_password: passwords.newPassword,
      role,
    };

    try {
      await resetpass(payload);
      setSuccess("Password reset successfully");
      setPasswords({ newPassword: "", confirmPassword: "" });
      setTimeout(() => setOpen(false), 1500);
    } catch (err) {
      setError("Failed to reset password");
    }
  };

  if (!profileData) {
    return <Typography>Loading Profile...</Typography>;
  }

  const roleLabel = role === "teacher" ? "Teacher" : "Student";

  return (
    <Box sx={{ maxWidth: 700, mx: "auto", mt: 4 }}>
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64 }}>
              <PersonIcon fontSize="large" />
            </Avatar>
            <Box sx={{ ml: 2 }}>
              <Typography variant="h5" fontWeight={800}>
                {roleLabel} Profile
              </Typography>
              <Typography color="text.secondary">
                View and manage your account details
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Profile Info */}
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">Full Name</Typography>
              <Typography fontWeight={600}>{profileData.name}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">Username</Typography>
              <Typography fontWeight={600}>{profileData.username}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">Email</Typography>
              <Typography fontWeight={600}>{profileData.email}</Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography color="text.secondary">Role</Typography>
              <Typography fontWeight={600}>{profileData.role}</Typography>
            </Grid>

            {/* Optional fields */}
            {profileData.phone && (
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Phone</Typography>
                <Typography fontWeight={600}>{profileData.phone}</Typography>
              </Grid>
            )}

            {role === "teacher" && profileData.subject && (
              <Grid item xs={12} sm={6}>
                <Typography color="text.secondary">Subject</Typography>
                <Typography fontWeight={600}>{profileData.subject}</Typography>
              </Grid>
            )}
          </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Reset Password */}
          <Box sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="warning"
              startIcon={<LockResetIcon />}
              onClick={() => setOpen(true)}
            >
              Reset Password
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* 🔐 Reset Password Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Reset Password</DialogTitle>

        <DialogContent>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

          <TextField
            label="New Password"
            type="password"
            name="newPassword"
            value={passwords.newPassword}
            onChange={handleChange}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={passwords.confirmPassword}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleResetPassword}>
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
