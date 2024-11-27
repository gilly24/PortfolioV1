import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // Single Home component manages both Start Screen and Cube Screen


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Consolidated Start and Cube screens */}
      </Routes>
    </Router>
  );
}
