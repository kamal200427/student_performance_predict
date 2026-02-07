// frontend/src/layout/StudentLayout.js

import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../context/AuthContext";

/**
 * StudentLayout
 * - Layout for authenticated STUDENT users
 * - Shows Navbar + Student Sidebar + Main Content
 */
export default function StudentLayout() {
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar role="student" />

      {/* Right section */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <Navbar user={user} role="student" />

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            bgcolor: "#f8fafc",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
