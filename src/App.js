import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WhoIAm from "./pages/WhoIAm";
import Projects from "./pages/Projects";
import Documentation from "./pages/Documentation";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/who-i-am" element={<WhoIAm />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/documentation" element={<Documentation />} />
      </Routes>
    </Router>
  );
};

export default App;
