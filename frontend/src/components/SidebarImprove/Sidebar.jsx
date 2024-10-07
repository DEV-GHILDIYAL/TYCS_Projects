import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./Sidebar.css";
import { toast, Slide } from "react-toastify";


const Sidebar = ({ setActiveTab }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if token is available in localStorage when the component mounts
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Set authenticated state to true
    } else {
      setIsAuthenticated(false); // Set authenticated state to false
    }
  }, []); // Empty dependency array ensures this runs only on mount

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token on logout
    toast.success("Logout successfull!", {
      position: "top-right",
      theme: "light",
      transition: Slide,
    });
    setIsAuthenticated(false); // Update state after logout
    setActiveTab("login") // Redirect to login page
  };

  const handleProtectedNavigation = (tab) => {
    if (isAuthenticated) {
      setActiveTab(tab); // If authenticated, change the active tab
    } else {
      setActiveTab("login"); // If not authenticated, redirect to login
    }
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
          <li onClick={() => handleProtectedNavigation("Home")}>
            {isOpen ? "Home" : <i className="fas fa-home"></i>}
          </li>
          <li onClick={() => handleProtectedNavigation("myProjects")}>
            {isOpen ? "My Projects" : <i className="fas fa-folder"></i>}
          </li>
          {/* <li onClick={() => handleProtectedNavigation("admin")}>
            {isOpen ? "Admin" : <i className="fas fa-user-shield"></i>}
          </li> */}
          <li onClick={() => handleProtectedNavigation("about")}>
            {isOpen ? "About Us" : <i className="fas fa-user-shield"></i>}
          </li>
          {/* <li onClick={() => handleProtectedNavigation("contact")}>
            {isOpen ? "Contact Us" : <i className="fas fa-user-shield"></i>}
          </li> */}
        </ul>

        <ul className="auth-links">
          {!isAuthenticated ? (
            <>
              <li onClick={() => setActiveTab("login")}>
                {isOpen ? "Login" : <i className="fas fa-sign-in-alt"></i>}
              </li>
              <li onClick={() => setActiveTab("register")}>
                {isOpen ? "Register" : <i className="fas fa-user-plus"></i>}
              </li>
            </>
          ) : (
            <li onClick={handleLogout}>
              {isOpen ? "Logout" : <i className="fas fa-sign-out-alt"></i>}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;