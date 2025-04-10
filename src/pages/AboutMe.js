import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/AboutMe.css"; // Ensure the CSS file is imported

const AboutMe = () => {
  return (
      <div class="container">
        <Header />
        <section class="about-me">
          <h2>👋 About Me</h2>
          <p><strong>Hey, I'm Charlton Smith</strong> — a passionate and pragmatic software engineer with over 7 years of experience building scalable, engaging, and intelligent digital experiences.</p>

          <p>From <strong>multiplayer web games</strong> to <strong>AI-powered applications</strong>, I specialize in <strong>full-stack development</strong>, <strong>object-oriented programming</strong>, and <strong>system architecture</strong>. My career has spanned <strong>fintech</strong>, <strong>blockchain</strong>, and <strong>game development</strong>, giving me a versatile edge when designing and deploying production-grade systems that balance performance, usability, and creativity.</p>

          <h3>🔧 What I Do Best:</h3>
          <ul>
            <li>⚙️ <strong>Full-Stack Engineering</strong> – Proficient in modern web stacks (React, Flask, Node.js, SQL, WebSockets, and more), with a focus on clean, maintainable code and solid backend logic.</li>
            <li>🧠 <strong>AI & Automation</strong> – Build custom GPT agents, integrate LLMs (OpenAI, Grok, DeepSeek), and create smart tools that enhance user interaction and productivity.</li>
            <li>🎮 <strong>Game Dev & Real-Time Systems</strong> – Craft interactive multiplayer experiences with custom mechanics, canvas-based rendering, and WebSocket-based networking.</li>
            <li>💡 <strong>Product Thinking</strong> – I bring a builder’s mindset to every project—focusing not just on features, but on <em>why</em> they matter to users and how they can grow.</li>
          </ul>

          <h3>🚀 Currently:</h3>
          <ul>
            <li>Running <a href="https://azoni.ai" target="_blank" rel="noreferrer"><strong>Azoni</strong></a> — my creative sandbox for launching experiments at the intersection of AI, games, and interactive media.</li>
            <li>Developing a browser-based multiplayer game with skills progression, in-game chat, and avatar customization.</li>
            <li>Prototyping LLM-as-NPC systems that allow players to interact with different AI models in immersive environments.</li>
            <li>Training for a <strong>1250 lbs powerlifting total</strong> and building out <strong>portfolio projects</strong> that showcase what I love to build.</li>
          </ul>

          <h3>🔍 Looking for:</h3>
          <p>I’m seeking opportunities where I can:</p>
          <ul>
            <li>Own product features end-to-end and collaborate closely with cross-functional teams</li>
            <li>Innovate in AI, games, or consumer-facing tools</li>
            <li>Work with startup-minded teams that care deeply about product quality and creativity</li>
            <li>Keep growing as a builder, teammate, and creative problem-solver</li>
          </ul>

          <h3>🧰 Tech Stack & Tools:</h3>
          <p><strong>Languages:</strong> Python, JavaScript/TypeScript, C#, SQL<br/>
          <strong>Frameworks:</strong> React, Flask, Express, FastAPI, Unity (C#)<br/>
          <strong>Databases:</strong> PostgreSQL, SQLite, Firebase<br/>
          <strong>Infra:</strong> AWS (EC2, S3), Vercel, Netlify<br/>
          <strong>Dev Tools:</strong> Git, WebSockets, Docker, Postman, Figma<br/>
          <strong>AI Platforms:</strong> OpenAI, Replicate, Grok, LangChain, LlamaIndex</p>

          <h3>📬 Let’s Connect</h3>
          <p>If you’re building something bold and need a well-rounded engineer who can ship, scale, and spark ideas — let’s talk.</p>
          {/* <p>
            📧 <a href="mailto:charlton@azoni.ai">charlton@azoni.ai</a><br/>
            🌐 <a href="https://azoni.ai" target="_blank">azoni.ai</a> | 💼 
            <a href="https://www.linkedin.com/in/charlton-smith/" target="_blank">LinkedIn</a> | 🧠 
            <a href="https://github.com/" target="_blank">GitHub</a>
          </p> */}
        </section>

        <Footer />
      </div>
      
  );
};

export default AboutMe;
