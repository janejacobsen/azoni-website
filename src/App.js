import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Documentation from "./pages/Documentation";
import AboutMe from "./pages/AboutMe";
import ChatWithGPT from "./pages/ChatWithGPT";
import ResumeViewer from "./components/ResumeViewer";
import GameCanvas from "./components/GameCanvas";
import ProjectDetail from "./pages/ProjectDetail";
import GlobalStyles from './styles/Global.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutMe />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/search" element={<ChatWithGPT />} />
      </Routes>
    </Router>
  );
};

export default App;
