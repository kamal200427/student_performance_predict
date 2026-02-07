// frontend/src/components/common/Loader.js

import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

/**
 * Reusable loading indicator
 * Can be used in pages, cards, buttons, or full-screen
 */
export default function Loader({ text = "Loading..." }) {
  return (
    <Box
      sx={{
        minHeight: 120,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1.5,
      }}
    >
      <CircularProgress size={36} />
      <Typography variant="body2" color="text.secondary">
        {text}
      </Typography>
    </Box>
  );
}
