// src/components/Login.jsx
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, user, logout } = useAuth();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  if (user) {
    return (
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Typography>Signed in as <strong>{user.name}</strong></Typography>
        <Button variant="outlined" color="secondary" onClick={() => logout()}>Sign out</Button>
      </Box>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // if user doesn't provide an id, create one from name + timestamp
    const uid = id || `user_${name.replace(/\s+/g, "_") || "guest"}_${Date.now()}`;
    login({ id: uid, name: name || "Guest" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
      <TextField label="Name" size="small" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name (e.g. Amina)" />
      <TextField label="Optional ID" size="small" value={id} onChange={(e) => setId(e.target.value)} placeholder="Optional unique id (or leave blank)" />
      <Button type="submit" variant="contained">Sign in</Button>
    </Box>
  );
}
