// src/pages/Home.jsx

import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TryAzoni from "../components/TryAzoni";
import { Link } from 'react-router-dom';
import "../styles/Home.css";

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
    title: 'Twitter',
    path: 'https://x.com/azoniAI',
    description: "Azoni AI's Twitter page.",
  },
  {
    title: 'Azoni AI',
    path: '/play',
    description: "Visit Azoni AI",
  },
  {
    title: 'Resume',
    path: '/resume',
    description: "My Resume!",
  },
];
// const posts = [
//   {
//     title: "Ghibli Style Image Gen",
//     image: "/avatars/charlton-ghibli.png",
//     snippet: "Experimenting with cartoon-to-anime image transfer using ControlNet + a fine-tuned LCM model.",
//     link: "/projects/ghibli-style"
//   },
// ];

const Home = () => {
  return (
    <div className="container">
      <Header />
      <main className="main">
        <section className="hero">
          <h1 className="hero-title">Hi</h1>
          <div className="recruiter-banner">
          <p>Explore my world of code, creativity, community-driven tools and the custom GPT I built to help answer your questions about me.</p>
          <a href="/Resume" className="banner-link">View Resume</a> · <a href="/Chat" className="banner-link">Chat with Azoni-GPT</a>
        </div>
        </section>

        <div className="card-grid">
          {sections.map((section) =>
            section.path.startsWith("http") ? (
              <a
                href={section.path}
                className="home-card"
                key={section.title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <span className="card-link">→ Learn more</span>
              </a>
            ) : (
              <Link to={section.path} className="home-card" key={section.title}>
                <h2>{section.title}</h2>
                <p>{section.description}</p>
                <span className="card-link">→ Learn more</span>
              </Link>
            )
          )}
        </div>
        {/* <div className="ai-blog-section">
          <h2>Whats new with AI?</h2>
          <div className="ai-blog-grid">
            
            {posts.map((post, i) => (
              <div className="ai-post" key={i}>
                <img src={post.image} alt={post.title} />
                <h4>{post.title}</h4>
                <p>{post.snippet}</p>
                {post.link && <a href={post.link} target="_blank" rel="noopener noreferrer">→ Read more</a>}
              </div>
            ))}
          </div>
        </div> */}
        {/* <GameCanvas /> */}
      </main>
      <TryAzoni />
      <Footer />
    </div>
  );
};

export default Home;
