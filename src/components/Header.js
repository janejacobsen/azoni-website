import React from "react";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import "../styles/Header.css"; // Ensure the CSS file is imported

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar">
      {/* Home Button */}
      <Link to="/" className="home-button">Home</Link>

      {/* Navigation Links */}
      
        <Link to="/aboutme" className="styled-link">About Me</Link>
        <Link to="/projects" className="styled-link">Projects</Link>
        <Link to="/chat" className="styled-link">Chat</Link>
        <Link to="/resume" className="styled-link">Resume</Link> {/* 👈 Add this */}

      {/* Social Links */}
      
      </nav>
      <SocialLinks />
    </header>
  );
};

export default Header;
