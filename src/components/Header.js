import React from "react";
import { Link } from "react-router-dom";
import SocialLinks from "./SocialLinks";
import "../styles/Header.css"; // Ensure the CSS file is imported

const Header = () => {
  return (
    <header className="header">
      {/* Home Button */}
      <Link to="/" className="home-button">Home</Link>

      {/* Navigation Links */}
      <nav className="nav">
        <Link to="/aboutme" className="styled-link">About Me</Link>
        <Link to="/projects" className="styled-link">Projects</Link>
        <Link to="/chat" className="styled-link">Chat</Link>
      </nav>

      {/* Social Links */}
      <SocialLinks />

      <p className="subtitle">Unleash the Power of Personalized AI</p>
    </header>
  );
};

export default Header;
