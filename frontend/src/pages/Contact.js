import React, { useState } from "react";
import { Box, Typography, TextField, Button, Stack, Alert } from "@mui/material";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now show success state; connect to email API if desired
    setSent(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSent(false), 4500);
  };

  return (
    <Box sx={{ textAlign: "center", my: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Contact Us</Typography>
      <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
        Have questions or suggestions? Send us a message and we'll get back to you.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 640, mx: "auto" }}>
        <Stack spacing={2}>
          <TextField label="Your Name" name="name" value={form.name} onChange={handleChange} fullWidth />
          <TextField label="Your Email" name="email" value={form.email} onChange={handleChange} fullWidth />
          <TextField label="Your Message" name="message" value={form.message} onChange={handleChange} multiline rows={5} fullWidth />
          <Button type="submit" variant="contained" color="primary">Send Message</Button>
        </Stack>
      </Box>

      {sent && <Alert severity="success" sx={{ mt: 3, maxWidth: 640, mx: "auto" }}>Message sent. Thank you!</Alert>}
    </Box>
  );
}
