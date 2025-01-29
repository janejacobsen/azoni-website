import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css"; // Import external CSS
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="container">
      <header className="header">
          <Link to="/who-i-am" className="header-link styled-link">
            About Me
          </Link>
          <Link to="/projects" className="header-link styled-link">
            Projects
          </Link>
        <div className="social-links">
          <a href="https://x.com/azoniAI" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://github.com/azoni" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://linkedin.com/in/charltonsmith" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <p className="subtitle">Unleash the Power of Personalized AI</p>
      </header>

      <main className="main">
        <section className="card">
          <h2 className="card-title">Under construction! This website does nothing.</h2>
          <p className="card-text">
            Azoni AI is a Python library that enables you to customize AI agents
            with unique personalities and behaviors. Transform the way your AI
            interacts with users with just a few lines of code.
          </p>
          <Link to="documentation"><button className="btn learn-more">Learn More</button></Link>
        </section>

        <section className="card">
          <h2 className="card-title">Install Azoni AI</h2>
          <p className="card-text">Get started quickly with the following command:</p>
          <div className="code-block">pip install azoni</div>
          <button className="btn documentation">View Documentation</button>
        </section>
      </main>

      <section className="try-section">
        <h2 className="try-title">Try Azoni AI Now</h2>
        <p className="try-text">Input a personality and experience Azoni AI in action.</p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="try-container"
        >
          <div className="input-group">
            <input
              type="text"
              placeholder="Enter a personality (e.g., friendly, professional)"
              className="input"
            />
            <button className="btn generate">Generate</button>
          </div>
          <div className="output-card">
            <p className="output-text">Output will appear here...</p>
          </div>
        </motion.div>
      </section>

      <footer className="footer">
        <div className="footer-text">
          <p>&copy; {new Date().getFullYear()} Azoni AI. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const WhoIAm = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Who I Am</h1>
        <Link to="/" className="header-link">Back to Home</Link>
      </header>
      <main className="main">
        <p className="card-text">I'm Charlton Smith, a business-focused software engineer specializing in AI and game development.</p>
      </main>
    </div>
  );
};
const Documentation = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Who I Am</h1>
        <Link to="/" className="header-link">Back to Home</Link>
      </header>
      <main className="main">
        <p className="card-text">I'm Charlton Smith, a business-focused software engineer specializing in AI and game development.</p>
      </main>
    </div>
  );
};
const Projects = () => {
  const projects = [
    {
      title: "Project One",
      description: "A brief description of Project One and its key features.",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Project Two",
      description: "An overview of Project Two and what makes it unique.",
      image: "https://via.placeholder.com/300",
    },
    {
      title: "Project Three",
      description: "Details about Project Three and its impact.",
      image: "https://via.placeholder.com/300",
    },
  ];

  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Projects</h1>
        <Link to="/" className="header-link">Back to Home</Link>
      </header>
      <main className="main">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <h2 className="project-title">{project.title}</h2>
            <p className="project-description">{project.description}</p>
          </div>
        ))}
      </main>
    </div>
  );
};
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
