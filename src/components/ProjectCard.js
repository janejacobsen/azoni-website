import React from "react";
import { Link } from "react-router-dom";
import "../styles/ProjectCard.css";

const ProjectCard = ({ title, description, image, slug }) => {
  return (
    <Link to={`/projects/${slug}`} className="project-card-link">
      <div className="project-card">
        <img src={image} alt={title} />
        <h3>{title}</h3>
        <p>{description}</p>
        <span className="card-link">→ Learn more</span>
      </div>
    </Link>
  );
};

export default ProjectCard;
