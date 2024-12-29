import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Make sure to add the CSS file for styling

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>AppName</h1> {/* Change this to your app's name */}
      </div>
      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Home
        </Link>
        <Link to="/my-projects" className="navbar-link">
          My Projects
        </Link>
        <Link to="/create-project" className="navbar-link">
          Create Project
        </Link>
        <Link to="/about-us" className="navbar-link">
          About Us
        </Link>
        <Link to="/login" className="navbar-link">
          Login
        </Link>
        <Link to="/register" className="navbar-link">
          Register
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
