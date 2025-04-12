import React from "react";
import { useParams } from "react-router-dom";
import projects from "../data/projects";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/ProjectDetail.css";
import { Link } from "react-router-dom";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="container">
        <Header />
        <main className="main">
          <h2>Project not found</h2>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <Header />
      <main className="main project-detail">
        <h1>{project.title}</h1>
        <Link to="/projects" className="project-back-link">← Back to Projects</Link>

        <img src={project.image} alt={project.title} className="project-image" />
        <p className="project-description">{project.description}</p>
        <div
          className="project-body"
          dangerouslySetInnerHTML={{ __html: project.details }}
        />
        {project.images && (
          <div className="project-gallery">
            {project.images.map((img, index) => (
              <img key={index} src={img} alt={`${project.title} screenshot ${index + 1}`} />
            ))}
          </div>
        )}
        <a
          href={project.github}
          className="project-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetail;
