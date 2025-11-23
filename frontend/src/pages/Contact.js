import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Paper,
} from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <Box sx={{ textAlign: "center", my: 6, px: 2 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, mb: 2, color: "#4A148C" }}
      >
        Contact Us
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: 700,
          mx: "auto",
          color: "#4E4E4E",
          mb: 4,
        }}
      >
        Have questions or suggestions? Send us a message and we’ll get back to
        you shortly.
      </Typography>

      <Paper
        elevation={6}
        sx={{
          maxWidth: 700,
          mx: "auto",
          p: 4,
          borderRadius: 3,
          background: "linear-gradient(135deg, #F3E5F5, #FFF8E1)",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Your Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              sx={{ background: "#fff", borderRadius: 2 }}
            />

            <TextField
              label="Your Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              sx={{ background: "#fff", borderRadius: 2 }}
            />

            <TextField
              label="Your Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              multiline
              rows={5}
              fullWidth
              sx={{ background: "#fff", borderRadius: 2 }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                py: 1.4,
                fontSize: "1rem",
                background: "#6A1B9A",
                "&:hover": { background: "#4A148C" },
                borderRadius: 2,
              }}
            >
              Send Message
            </Button>
          </Stack>
        </Box>
      </Paper>

      {sent && (
        <Alert
          severity="success"
          sx={{ mt: 3, maxWidth: 700, mx: "auto", borderRadius: 2 }}
        >
          Message sent successfully! Thank you.
        </Alert>
      )}
    </Box>
  );
}
