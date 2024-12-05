import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import { themeStyles } from "./styles/theme";


const App = () => {
  const [theme, setTheme] = useState(themeStyles.dark); // Default to dark theme

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme.background === "linear-gradient(135deg, #0a0a0a, #141414)"
        ? themeStyles.light // Switch to light theme
        : themeStyles.dark // Switch to dark theme
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  );
};

export default App;
