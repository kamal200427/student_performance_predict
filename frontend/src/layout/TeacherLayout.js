// frontend/src/layout/TeacherLayout.js

import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import { useAuth } from "../context/AuthContext";

/**
 * TeacherLayout
 * - Layout for authenticated TEACHER users
 * - Shows Navbar + Teacher Sidebar + Main Content
 */
export default function TeacherLayout() {
  const { user } = useAuth();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar role="teacher" />

      {/* Right section */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Navbar */}
        <Navbar user={user} role="teacher" />

        {/* Page Content */}
        <Box
          sx={{
            flexGrow: 1,
            p: { xs: 2, md: 3 },
            bgcolor: "#f1f5f9",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
