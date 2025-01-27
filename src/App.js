import React from "react";
import "./App.css"; // Import external CSS
import { motion } from "framer-motion";

const App = () => {
  return (
    <div className="container">
      <header className="header">
        <h1 className="title">Azoni AI</h1>
        <p className="subtitle">Unleash the Power of Personalized AI</p>
      </header>

      <main className="main">
        <section className="card">
          <h2 className="card-title">What is Azoni AI?</h2>
          <p className="card-text">
            Azoni AI is a Python library that enables you to customize AI agents
            with unique personalities and behaviors. Transform the way your AI
            interacts with users with just a few lines of code.
          </p>
          <button className="btn learn-more">Learn More</button>
        </section>

        <section className="card">
          <h2 className="card-title">Install Azoni AI</h2>
          <p className="card-text">Get started quickly with the following command:</p>
          <div className="code-block">
            pip install azoni
          </div>
          <button className="btn documentation">View Documentation</button>
        </section>
      </main>

      <section className="try-section">
        <h2 className="try-title">Try Azoni AI Now</h2>
        <p className="try-text">
          Input a personality and experience Azoni AI in action.
        </p>
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
        <p className="footer-text">&copy; {new Date().getFullYear()} Azoni AI. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
