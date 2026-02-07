// frontend/src/App.js

import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

/* Context */
import { AuthProvider } from "./context/AuthContext";

/* Routes */
import AppRoutes from "./routes/AppRoutes";

/* MUI Theme */
const theme = createTheme({
  palette: {
    primary: { main: "#2563eb" },
    background: { default: "#f8fafc" },
    text: { primary: "#0f172a" },
  },
  typography: {
    fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Global Auth State */}
      <AuthProvider>
        {/* Centralized Routing */}
        <AppRoutes />
      </AuthProvider>

    </ThemeProvider>
  );
}
