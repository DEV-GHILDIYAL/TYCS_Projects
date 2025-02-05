import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Navbar.css"; // Ensure you have this CSS file for styling
import {
  FaFileAlt,
  FaFolderOpen,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
} from "react-icons/fa";
import SidebarMenu from "../Sidebar/SidebarMenu";
import SidebarMenuAndroid from "../Sidebar/SidebarMenuAndroid";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle the menu visibility
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
  const [userRole, setUserRole] = useState(null); // User role
  
  const [isOpen, setIsOpen] = useState(true); // For desktop sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Mobile menu state

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);  // Toggle the mobile menu
    setIsMobileOpen(!isMobileOpen);  // Also toggle the isMobileOpen state
  };

  const handleLogout = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/auth/logout`,
          {
            method: "POST",
            credentials: "include",
          }
        );
  
        if (response.ok) {
          Cookies.remove("userRole");
          setIsLoggedIn(false);
          setUserRole(null);
        } else {
          console.warn("Logout failed:", await response.text());
        }
      } catch (error) {
        console.error("Error during logout:", error.message);
      }
    };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/user-role`, { credentials: "include" });
        const data = await response.json();
        setUserRole(data.role);
        if (data.role == "admin" || data.role == "student"){
          setIsLoggedIn(true);
        } else {
          setUserRole(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        setUserRole(null);
        setIsLoggedIn(false);
      }
      // console.log(userRole);
    };

    checkAuth();
  }, []);

  const routes = [
    { path: "/", name: "Home", icon: <FaHome />, roles: ["all"] },
    { path: "/my-projects", name: "My Projects", icon: <FaFolderOpen />, roles: ["student", "loggedIn"] },
    { path: "/about-us", name: "About Us", icon: <FaFileAlt />, roles: ["all"] },
    { path: "/dashboard", name: "Dashboard", icon: <FaHome />, roles: ["admin", "loggedIn"] },
    { path: "/management/attendance-sessions", name: "Attendance Sessions", icon: <FaLock />, roles: ["admin", "loggedIn"] },
    {
      path: "/mass-student-upload",
      name: "Mass Student Upload",
      icon: <FaHome />,
      roles: ["admin", "loggedIn"],
    },
    {
      path: "/file-manager", name: "Management", icon: <FaFolderOpen />, roles: ["admin", "loggedIn"], subRoutes: [
        { path: "/management/students", name: "Student", icon: <FaUser /> },
        { path: "/management/projects", name: "Project", icon: <FaMoneyBill /> }
      ]
    },
  ];

  const getVisibleRoutes = () => {
    return routes.filter((route) => {
      if (route.roles.includes("all")) return true;
      if (isLoggedIn && route.roles.includes("loggedIn")) {
        return route.roles.includes(userRole);
      }
      return false;
    });
  };

  const visibleRoutes = getVisibleRoutes();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-brand">
          <h1>Project Library</h1> {/* Change this to your app's name */}
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
        <section className="navbar-link">
          {visibleRoutes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenuAndroid
                  key={index}
                  route={route}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  showAnimation={{
                    hidden: { opacity: 0, x: -20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  handleMenuToggle={handleMenuToggle}
                />
              );
            }
            return (
              <NavLink
                to={route.path}
                key={index}
                className="link"
                activeClassName="active"
                onClick={() => {
                  if (isMobileOpen) handleMenuToggle(); // Close menu on mobile click
                }}
              >
                <div className="icon">{route.icon}</div>
                {isOpen && <div className="link_text">{route.name}</div>}
              </NavLink>
            );
          })}
        </section>
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="navbar-link" onClick={handleMenuToggle}>
              Profile
            </Link>
            <Link to="/login" className="navbar-link" onClick={handleLogout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="navbar-link" onClick={handleMenuToggle}>
              Login
            </Link>
            <Link to="/register" className="navbar-link" onClick={handleMenuToggle}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};


export default Navbar;
