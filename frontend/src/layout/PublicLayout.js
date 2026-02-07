// frontend/src/layout/PublicLayout.js

import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
import Navbar from "../components/common/Navbar";

/**
 * PublicLayout
 * - Used for public (unauthenticated) pages
 * - Wraps pages like Home, Login, Register
 */
export default function PublicLayout() {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top Navigation */}
      <Navbar user={null} role={null} />

      {/* Main Content */}
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          py: { xs: 3, md: 5 },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Outlet />
      </Container>

      {/* Optional Footer */}
      <Box
        sx={{
          py: 2,
          textAlign: "center",
          fontSize: 14,
          color: "text.secondary",
        }}
      >
        © {new Date().getFullYear()} Student Performance System
      </Box>
    </Box>
  );
}
