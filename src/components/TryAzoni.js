// import React, { useState } from "react";
// import { motion } from "framer-motion";
import "../styles/TryAzoni.css";

const TryAzoni = () => {
  // const [input, setInput] = useState("");
  // const [output, setOutput] = useState("Output will appear here...");

  // const handleGenerate = () => {
  //   setOutput(`Generated personality: ${input}`);
  // };

  return (
    <section className="try-section">
      <h2 className="try-title">Try Azoni AI Now</h2>
        <section className="card">
          <div className="code-block">pip install azoni (Coming soon...)</div>
        </section>
      {/* <p className="try-text">Input a personality and experience Azoni AI in action.</p>
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="btn generate" onClick={handleGenerate}>Generate</button>
        </div>
        <div className="output-card">
          <p className="output-text">{output}</p>
        </div>
      </motion.div> */}
    </section>
  );
};

export default TryAzoni;
