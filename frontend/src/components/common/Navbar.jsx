// frontend/src/components/common/Navbar.js

import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/auth";

/**
 * Navbar component
 * @param {Object} props
 * @param {Object|null} props.user - logged-in user
 * @param {string|null} props.role - "student" | "teacher"
 */
export default function Navbar({ user, role }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/select-role");
  };

  const goDashboard = () => {
    if (role === "student") navigate("/student");
    else if (role === "teacher") navigate("/teacher");
    else navigate("/");
  };

  return (
    <AppBar position="static" color="primary" elevation={2}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        
        {/* LEFT: LOGO / TITLE */}
        <Box
          sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onClick={goDashboard}
        >
          <SchoolIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Student Performance System
          </Typography>
        </Box>

        {/* RIGHT: ACTIONS */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {user ? (
            <>
              <Typography variant="body2">
                {user.name || "User"} ({role})
              </Typography>

              <Button
                color="inherit"
                variant="outlined"
                size="small"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                onClick={() => navigate("/register")}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
