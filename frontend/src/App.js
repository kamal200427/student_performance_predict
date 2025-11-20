import React, { useState } from "react";
import InputForm from "./components/InputForm";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  const [page, setPage] = useState("home"); // home, about, contact
  const [result, setResult] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home onResult={setResult} result={result} />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return <Home onResult={setResult} result={result} />;
    }
  };

  return (
    <div style={styles.page}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <h2 style={{ color: "#fff" }}>Student Performance App</h2>
        <div>
          <button style={styles.link} onClick={() => setPage("home")}>Home</button>
          <button style={styles.link} onClick={() => setPage("about")}>About</button>
          <button style={styles.link} onClick={() => setPage("contact")}>Contact</button>
        </div>
      </nav>

      {/* Render Page */}
      <div style={styles.pageContent}>
        {renderPage()}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(120deg, #6a11cb, #5888daff)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 50px",
    background: "#1e88e5",
    width: "100%",
    maxWidth: "1200px",
    alignItems: "center",
    borderRadius: "10px",
    marginBottom: "30px",
  },
  link: {
    color: "#fff",
    marginLeft: "20px",
    fontWeight: "bold",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    fontSize: "16px",
  },
  pageContent: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    justifyContent: "center",
  },
};

export default App;
