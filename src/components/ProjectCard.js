import React from "react";
import "../styles/ProjectCard.css";

const ProjectCard = ({ title, description, image, github }) => {
  return (
    <div className="project-card">
      <img src={image} alt={title} className="project-image" style={{width: '50px', height: '50px'}}/>
      <h2 className="project-title">{title}</h2>
      <p className="project-description">{description}</p>
      {github && <a href={github} target="_blank" rel="noopener noreferrer">GitHub</a>}
    </div>
  );
};

export default ProjectCard;
