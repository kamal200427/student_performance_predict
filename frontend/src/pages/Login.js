import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user, logout } = useAuth();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  // If already logged in
  if (user) {
    return (
      <Box
        sx={{
          height: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Welcome back, <strong>{user.name}</strong> 👋
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => logout()}
          sx={{ px: 4, py: 1.2, borderRadius: 2 }}
        >
          Logout
        </Button>
      </Box>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const uid = id || `user_${name.replace(/\s+/g, "_") || "guest"}_${Date.now()}`;
    login({ id: uid, name: name || "Guest" });
  };

  return (
    <Box
      sx={{
        height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #f2e6ff 0%, #ffffff 100%)",
        px: 2,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Paper
          elevation={6}
          sx={{
            width: 450,
            p: 5,
            borderRadius: 4,
            backdropFilter: "blur(10px)",
            background: "rgba(255,255,255,0.8)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              mb: 3,
              fontWeight: 800,
              color: "#5b1096",
            }}
          >
            Login
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Your Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              label="Optional ID"
              fullWidth
              value={id}
              onChange={(e) => setId(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.3,
                borderRadius: 2,
                background: "#5b1096",
                fontWeight: 700,
                fontSize: "1rem",
                "&:hover": { background: "#440a73" },
              }}
            >
              Sign In
            </Button>
          </Box>
        </Paper>
      </motion.div>
    </Box>
  );
}
