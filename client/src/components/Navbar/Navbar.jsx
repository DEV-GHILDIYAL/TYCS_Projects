import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"; // Make sure to add the CSS file for styling

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu visibility

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <h1>AppName</h1> {/* Change this to your app's name */}
        </div>
      </div>

      {/* Hamburger icon for mobile view */}
      <div className="navbar-right">
        <div className="hamburger" onClick={handleMenuToggle}>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`line ${isMenuOpen ? "open" : ""}`}></div>
        </div>
      </div>

      {/* Navbar links */}
      <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
        <Link to="/" className="navbar-link" onClick={handleMenuToggle}>
          Home
        </Link>
        <Link to="/my-projects" className="navbar-link" onClick={handleMenuToggle}>
          My Projects
        </Link>
        <Link to="/create-project" className="navbar-link" onClick={handleMenuToggle}>
          Create Project
        </Link>
        <Link to="/about-us" className="navbar-link" onClick={handleMenuToggle}>
          About Us
        </Link>
        <Link to="/login" className="navbar-link" onClick={handleMenuToggle}>
          Login
        </Link>
        <Link to="/register" className="navbar-link" onClick={handleMenuToggle}>
          Register
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
