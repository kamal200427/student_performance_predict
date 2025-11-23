import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, AppBar, Toolbar, Typography, Button } from "@mui/material";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";   // ⬅ make sure this file exists
import { useAuth } from "./context/AuthContext";

const theme = createTheme({
  palette: {
    primary: { main: "#6a1b9a" }, 
    secondary: { main: "#ffffff" },
    background: { default: "#faf7ff" },
    text: { primary: "#0f172a" },
  },
  typography: {
    fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif',
  },
});

export default function App() {
  const [page, setPage] = useState("home");
  // const { user } = useAuth();
 const { user, logout } = useAuth();
  // scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "login":
        return <Login />;    // ⬅ Login route added
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(180deg, rgba(106,27,154,0.06) 0%, rgba(250,250,255,1) 35%)",
          backgroundImage: `url('/mnt/data/38a9c1ef-73d3-49c3-86ee-82bb09724bb9.png')`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          pb: 10,
        }}
      >
        <AppBar position="sticky" elevation={0} color="transparent" sx={{ backdropFilter: "blur(6px)" }}>
          <Toolbar
            sx={{
              maxWidth: 1200,
              mx: "auto",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6" sx={{ color: "primary.main", fontWeight: 800 }}>
              🎓 Student Performance Predictor
            </Typography>

            <Box>
              <Button onClick={() => setPage("home")} sx={{ color: "primary.main", fontWeight: 700, mr: 1 }}>
                Home
              </Button>

              <Button onClick={() => setPage("about")} sx={{ color: "primary.main", fontWeight: 700, mr: 1 }}>
                About
              </Button>

              <Button onClick={() => setPage("contact")} sx={{ color: "primary.main", fontWeight: 700, mr: 1 }}>
                Contact
              </Button>

              {/* ⭐ Login button added */}
              <Button
                onClick={() => setPage("login")}
                variant="outlined"
                sx={{
                  color: "#6a1b9a",
                  borderColor: "#6a1b9a",
                  fontWeight: 700,
                  "&:hover": { borderColor: "#4a0d75", color: "#4a0d75" },
                }}
              >
                {user ? "Profile" : "Login"}
              </Button>
              {user && (
                <Button variant="contained" onClick={logout}>
                  Logout
                </Button>
               )}
            </Box>
          </Toolbar>
        </AppBar>

        <Container maxWidth="lg" sx={{ mt: 6 }}>
          {renderPage()}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
