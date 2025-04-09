import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/AboutMe.css"; // Ensure the CSS file is imported

const AboutMe = () => {
  return (
      <div class="container">
        <Header />
        <h2>👋 About Me</h2>
        <p>Hey, I'm <strong>Charlton Smith</strong> — a software engineer with a passion for building immersive experiences, whether it’s crafting multiplayer web games, designing intelligent AI agents, or pushing pixels on creative projects.</p>
        
        <p>With over 7 years of full-stack development under my belt, I specialize in object-oriented programming, system design, and AI-enhanced user experiences. I’ve worked across industries, from fintech to game development, and I'm currently focused on blending real-time interactivity with smart, responsive interfaces.</p>
        
        <p><strong>Azoni</strong> is my creative lab — a space where I experiment, build, and share things that spark curiosity.</p>
        
        <p>When I’m not coding, you’ll probably find me powerlifting, gaming, or working on new ideas for community-driven worlds.</p>
        
        <p>Let’s build something awesome. 🚀</p>
        <Footer />
      </div>
      
  );
};

export default AboutMe;
