import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProjectCard from "../components/ProjectCard";

const projects = [
  {
    title: "Azoni AI",
    description: "Customize AI agents with unique personalities.",
    image: "https://via.placeholder.com/300",
    github: "https://github.com/azoni/azoni-package",
  },
  {
    title: "A Dawn of Heroes",
    description: "Game development project.",
    image: "./public/logo512.png",
    github: "https://github.com/azoni/adoh-dps",
  },
];

const Projects = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default Projects;
