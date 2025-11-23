import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        mt: 12,
        py: 4,
        background: "#0f172a",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: "1rem",
          fontWeight: 500,
          opacity: 0.8,
        }}
      >
        © {new Date().getFullYear()} Student Performance Predictor — All Rights Reserved.
      </Typography>
    </Box>
  );
}
