// src/components/ProjectCard.jsx

import React from "react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ title, description, image, github }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" />
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={github} target="_blank" rel="noopener noreferrer" className="project-link">
          → View on GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
