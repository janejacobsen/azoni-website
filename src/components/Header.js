import React from "react";
import SocialLinks from "./SocialLinks";
import "../styles/Header.css"; // Ensure the CSS file is imported
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="site-header">
      <nav className="navbar">
        <div className="nav-left">
        <NavLink
          to="/"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Home
        </NavLink>
        <NavLink
          to="/aboutme"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          About
        </NavLink>
        <NavLink
          to="/projects"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Projects
        </NavLink>
        <NavLink
          to="/chat"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Chat
        </NavLink>
        <NavLink
          to="/resume"
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          Resume
        </NavLink>
        </div>
        <div className="nav-right">
          <SocialLinks />
        </div>
      </nav>
    </header>
  );
}

export default Header;
