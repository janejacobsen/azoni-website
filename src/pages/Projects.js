// src/pages/Projects.jsx

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";
import "../styles/ProjectCard.css";

const projects = [
  {
    title: "Azoni AI",
    description: "Customize AI agents with unique personalities.",
    image: "/projects/nwn.png",
    github: "https://github.com/azoni/azoni-package",
  },
  {
    title: "A Dawn of Heroes",
    description: "Game development project.",
    image: "/projects/nwn.png",
    github: "https://github.com/azoni/adoh-dps",
  },
  {
    title: "A Dawn of Heroes",
    description: "Game development project.",
    image: "/projects/nwn.png",
    github: "https://github.com/azoni/adoh-dps",
  },
  {
    title: "A Dawn of Heroes",
    description: "Game development project.",
    image: "/projects/nwn.png",
    github: "https://github.com/azoni/adoh-dps",
  },
  {
    title: "A Dawn of Heroes",
    description: "Game development project.",
    image: "/projects/nwn.png",
    github: "https://github.com/azoni/adoh-dps",
  },
  {
    title: "A Dawn of Heroes",
    description: "Game development project.",
    image: "/projects/nwn.png",
    github: "https://github.com/azoni/adoh-dps",
  },
];

const Projects = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <h2 className="page-title">💻 My Projects</h2>
        <p className="page-subtitle">A collection of tools, games, and AI experiments I've built.</p>
        <div className="project-grid">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
