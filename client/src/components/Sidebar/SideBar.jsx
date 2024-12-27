import { NavLink } from "react-router-dom";
import { FaFileAlt, FaFolderOpen, FaHome, FaLock, FaMoneyBill, FaUser, FaBars } from "react-icons/fa";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";
import "./Sidebar.css";

const routes = [
  { path: "/", name: "Home", icon: <FaHome /> },
  { path: "/my-projects", name: "My Projects", icon: <FaFolderOpen /> },
  { path: "/about-us", name: "About Us", icon: <FaFileAlt /> },
  { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
  {
    path: "/file-manager", name: "Management", icon: <FaFolderOpen />, subRoutes: [
      { path: "/management/students", name: "Student", icon: <FaUser /> },
      { path: "/management/attendance", name: "Attendance", icon: <FaLock /> },
      { path: "/management/projects", name: "Project", icon: <FaMoneyBill /> }
    ]
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);  // For desktop sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false);  // For mobile hamburger menu

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  return (
    <div className="main-container">
      <div className={`sidebar ${isOpen ? 'open' : 'closed'} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="top-area">
          <div className="top_section">
            {isOpen && <h1 className="logo">Project Library</h1>}
            {/* Hamburger Menu for Mobile */}
            <div className="hamburger" onClick={toggleMobileMenu}>
              <FaBars />
            </div>
          </div>
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return <SidebarMenu route={route} isOpen={isOpen} setIsOpen={setIsOpen} />;
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  onClick={() => isMobileOpen && toggleMobileMenu()}  // Close menu on click for mobile
                >
                  <div className="icon">{route.icon}</div>
                  {isOpen && <div className="link_text">{route.name}</div>}
                </NavLink>
              );
            })}
          </section>
        </div>
        <div className="bottom_section">
          <NavLink to="/profile" className="link" activeClassName="active" onClick={() => isMobileOpen && toggleMobileMenu()}>
            <div className="icon"><FaUser /></div>
            {isOpen && <div className="link_text">Profile</div>}
          </NavLink>
          <NavLink to="/login" className="link" activeClassName="active" onClick={() => isMobileOpen && toggleMobileMenu()}>
            <div className="icon"><FaLock /></div>
            {isOpen && <div className="link_text">Login</div>}
          </NavLink>
          <NavLink to="/register" className="link" activeClassName="active" onClick={() => isMobileOpen && toggleMobileMenu()}>
            <div className="icon"><FaUser /></div>
            {isOpen && <div className="link_text">Register</div>}
          </NavLink>
        </div>
      </div>

      <main>{children}</main>
    </div>
  );
};

export default SideBar;
