import React from "react";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ backdropFilter: "blur(6px)", py: 1 }}
    >
      <Toolbar
        sx={{
          maxWidth: 1200,
          mx: "auto",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ color: "primary.main", fontWeight: 800 }}
        >
          🎓 Student Performance Predictor
        </Typography>

        <Box>
          <Button component={Link} to="/" sx={{ color: "#6a1b9a", fontWeight: 700 }}>
            Home
          </Button>

          <Button component={Link} to="/about" sx={{ color: "#6a1b9a", fontWeight: 700 }}>
            About
          </Button>

          <Button component={Link} to="/contact" sx={{ color: "#6a1b9a", fontWeight: 700 }}>
            Contact
          </Button>

          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              color: "#6a1b9a",
              borderColor: "#6a1b9a",
              fontWeight: 700,
              mx: 1,
            }}
          >
            {user ? "Profile" : "Login"}
          </Button>

          {user && (
            <Button
              variant="contained"
              onClick={logout}
              sx={{ bgcolor: "#6a1b9a", fontWeight: 700 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
