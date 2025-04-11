// src/components/ResumeViewer.jsx

import React from "react";
import "../styles/ResumeViewer.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const ResumeViewer = () => {
  return (
    <div className="resume-container">
      <Header />
      <h2>📄 My Resume</h2>

      <div className="resume-frame">
        <iframe
          src="/CharltonResume.pdf"
          title="Charlton Smith Resume"
          width="100%"
          height="800px"
          style={{ border: "none" }}
        />
      </div>

      <a href="/CharltonResume.pdf" download className="download-button">
        ⬇️ Download Resume
      </a>
      <Footer />
    </div>
  );
};

export default ResumeViewer;
