import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TryAzoni from "../components/TryAzoni";
import GameCanvas from "../components/GameCanvas";
import { Link } from 'react-router-dom';

import "../styles/App.css";

const sections = [
  {
    title: 'About Me',
    path: '/aboutme',
    description: "Learn more about my background, what I'm working on, and what drives me as an engineer.",
  },
  {
    title: 'Projects',
    path: '/projects',
    description: "Explore a collection of creative builds, games, tools, and experiments from my dev lab.",
  },
  {
    title: 'Chat',
    path: '/chat',
    description: "Chat with an AI assistant powered by the same tools I use to build my bots and systems.",
  },
  {
    title: 'Azoni AI',
    path: 'https://x.com/azoniAI',
    description: "Azoni AI's Twitter page.",
  },
];

const Home = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <section className="card">
          <h2 className="game-title">Home - Under Construction</h2>
          <p className="home-intro">Explore my world of code, creativity, and community-driven tools.</p>
          <div className="card-grid">
          {sections.map((section) => (
            <Link to={section.path} className="home-card" key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.description}</p>
              <span className="card-link">→ Learn more</span>
            </Link>
            ))}
          </div>
          <br></br>
          <h2>Game backend currently offline.</h2>
          <GameCanvas />
        </section>
      </main>
      <TryAzoni />
      <Footer />
    </div>
  );
};

export default Home;
