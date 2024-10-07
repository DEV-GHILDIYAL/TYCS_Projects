import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = ({ setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      {/* Hamburger Icon */}
      <div className="title">
      <h2 className="sidebar-logo">{isOpen ? "Project Hub" : "PH"}</h2>
        <div className="hamburger" onClick={toggleSidebar}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </div>
        
        
      </div>
      <div className="sidebar-content">
        <ul>
          <li onClick={() => setActiveTab("Home")}>
            {isOpen ? "Home" : <i className="fas fa-home"></i>}
          </li>
          <li onClick={() => setActiveTab("myProjects")}>
            {isOpen ? "My Projects" : <i className="fas fa-folder"></i>}
          </li>
          <li onClick={() => setActiveTab("admin")}>
            {isOpen ? "Admin" : <i className="fas fa-user-shield"></i>}
          </li>
        </ul>

        <ul className="auth-links">
          <li onClick={() => setActiveTab("login")}>
            {isOpen ? "Login" : <i className="fas fa-sign-in-alt"></i>}
          </li>
          <li onClick={() => setActiveTab("register")}>
            {isOpen ? "Set Password" : <i className="fas fa-user-plus"></i>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
