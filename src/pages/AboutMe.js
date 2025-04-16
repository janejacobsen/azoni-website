import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/AboutMe.css";

const AboutMe = () => {
  return (
    <div className="container">
      <Header />
      <main className="about">
        <div className="about-header">
          <img src="/avatars/catt.png" alt="Charlton Smith" className="about-headshot" />
          <div>
            <h2>Hi, I'm Charlton Smith</h2>
            <p className="intro">
              I'm a passionate and pragmatic software engineer with 7+ years of experience building scalable, engaging, and intelligent digital experiences.
            </p>
          </div>
        </div>

        <p>
          From <strong>web development</strong> to <strong>AI-powered applications</strong>, I specialize in <strong>full-stack development</strong>,
          <strong> object-oriented programming</strong>, and <strong>system architecture</strong>. My career spans <em>fintech, blockchain, and game development</em>,
          giving me a versatile edge when designing creative and production-grade systems.
        </p>

        <section className="about-section">
          <h3>What I Do Best</h3>
          <ul>
            <li><strong>Full-Stack Engineering</strong> — React, Flask, Node.js, SQL, WebSockets, and more</li>
            <li><strong>AI & Automation</strong> — GPT agents, LLMs (OpenAI, Grok, DeepSeek), and smart productivity tools</li>
            <li><strong>Game Dev & Real-Time Systems</strong> — Multiplayer mechanics, canvas rendering, WebSocket networking</li>
            <li><strong>Product Thinking</strong> — Focused on why features matter to users, not just what they do</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Currently</h3>
          <ul>
            <li>Running <strong>Azoni</strong>, a sandbox for experiments at the intersection of AI and games</li>
            <li>Building a multiplayer game with progression, chat, and avatar customization</li>
            <li>Prototyping LLM-as-NPC systems for immersive interaction</li>
            <li>Training for a <strong>1250 lb powerlifting total</strong> and shipping side projects</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Looking For</h3>
          <ul>
            <li>Ownership over end-to-end product features</li>
            <li>Roles in AI, gaming, or consumer-facing tech</li>
            <li>Mission-driven teams that value design, creativity, and smart systems</li>
          </ul>
        </section>

        <section className="about-section">
          <h3>Tech Stack</h3>
          <p><strong>Languages:</strong> Python, JavaScript, SQL, C#, Java</p>
          <p><strong>Frameworks:</strong> React, Flask, Express, FastAPI, Unity</p>
          <p><strong>Databases:</strong> PostgreSQL, SQLite, Firebase</p>
          <p><strong>Cloud & Infra:</strong> AWS, Vercel, Netlify</p>
          <p><strong>Tooling:</strong> Git, WebSockets, Docker, Postman, Figma</p>
          <p><strong>LLM Platforms:</strong> OpenAI, Replicate, Grok, LangChain, LlamaIndex</p>
        </section>

        <section className="about-section">
          <h3>Let’s Connect</h3>
          <p>I'm always open to discussing new opportunities or cool ideas with thoughtful teams and builders.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutMe;
