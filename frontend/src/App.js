import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

const theme = createTheme({
  palette: {
    primary: { main: "#6a1b9a" },
    background: { default: "#faf7ff" },
    text: { primary: "#0f172a" },
  },
  typography: {
    fontFamily: '"Inter","Roboto","Helvetica","Arial",sans-serif',
  },
});

// React Router v7 — Route setup
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <About />
        <Footer />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <Navbar />
        <Contact />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
        <Footer />
      </>
    ),
  },
]);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
