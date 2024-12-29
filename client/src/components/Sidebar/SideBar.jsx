import { NavLink, useNavigate } from "react-router-dom";
import {
  FaFileAlt,
  FaFolderOpen,
  FaHome,
  FaLock,
  FaMoneyBill,
  FaUser,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import "./Sidebar.css";
import SidebarMenu from "./SidebarMenu";

const SideBar = ({ children }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true); // For desktop sidebar
  const [isMobileOpen, setIsMobileOpen] = useState(false); // For mobile hamburger menu
  const [userRole, setUserRole] = useState(null); // User role
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status

  const toggleMobileMenu = () => setIsMobileOpen(!isMobileOpen);

  // Routes Configuration
  const routes = [
    { path: "/", name: "Home", icon: <FaHome />, roles: ["all"] },
    {
      path: "/my-projects",
      name: "My Projects",
      icon: <FaFolderOpen />,
      roles: ["student", "loggedIn"],
    },
    {
      path: "/about-us",
      name: "About Us",
      icon: <FaFileAlt />,
      roles: ["all"],
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaHome />,
      roles: ["admin", "loggedIn"],
    },
    {
      path: "/file-manager",
      name: "Management",
      icon: <FaFolderOpen />,
      roles: ["admin", "loggedIn"],
      subRoutes: [
        { path: "/management/students", name: "Student", icon: <FaUser /> },
        {
          path: "/management/attendance",
          name: "Attendance",
          icon: <FaLock />,
        },
        {
          path: "/management/projects",
          name: "Project",
          icon: <FaMoneyBill />,
        },
      ],
    },
  ];
  // Decode Token and Set Role
  useEffect(() => {
    const checkAuth = () => {
      try {
        const userRole = Cookies.get("userRole");
        console.log("User role from cookie:", userRole);

        if (userRole) {
          setUserRole(userRole);
          setIsLoggedIn(true);
        } else {
          console.warn("No role cookie found");
          setUserRole(null);
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setUserRole(null);
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    Cookies.remove("userRole");
    
    window.location.reload();
    try {
      // Call the backend logout API
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Ensures cookies are sent with the request
      });
  
      if (response.ok) {
        // If logout is successful, clear cookies and update state
        Cookies.remove("token");
        Cookies.remove("userRole");
        setIsLoggedIn(false);
        setUserRole(null);
        console.log("Logout successful");
      } else {
        console.warn("Logout failed:", await response.text());
      }
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };
  

  // Filter Routes Based on Role and Login Status
  // Filter Routes Based on Role and Login Status
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
    <div className="main-container">
       <div
        className={`sidebar ${isMobileOpen ? "mobile-open" : ""}`}
      >
        <div className="top-area">
          <div className="top_section">
            {isOpen && <h1 className="logo">Project Library</h1>}
          </div>
          <section className="routes">
            {visibleRoutes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  // <></>
                  <SidebarMenu
                    key={index}
                    route={route}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    showAnimation={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0 },
                    }}
                  />
                );
              }
              return (
                // <></>
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeClassName="active"
                  onClick={() => isMobileOpen && toggleMobileMenu()} // Close menu on mobile click
                >
                  <div className="icon">{route.icon}</div>
                  {isOpen && <div className="link_text">{route.name}</div>}
                </NavLink>
              );
            })}
          </section>
        </div>
        <div className="bottom_section">
          {isLoggedIn ? (
            <>
              <NavLink to="/profile" className="link" activeClassName="active">
                <div className="icon">
                  <FaUser />
                </div>
                {isOpen && <div className="link_text">Profile</div>}
              </NavLink>

              <NavLink to="/login"
                className="link"
                onClick={handleLogout}
                activeClassName="active"
              >
                <div className="icon">
                  <FaLock />
                </div>
                {isOpen && <div className="link_text">Logout</div>}
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login" className="link" activeClassName="active">
                <div className="icon">
                  <FaLock />
                </div>
                {isOpen && <div className="link_text">Login</div>}
              </NavLink>
              <NavLink to="/register" className="link" activeClassName="active">
                <div className="icon">
                  <FaUser />
                </div>
                {isOpen && <div className="link_text">Register</div>}
              </NavLink>
            </>
          )}
        </div>
      </div>
      {/* <div className="mobile-navbar"></div>
      <div className="desktop-navbar">
     
      </div> */}
      

      <main>{children}</main>
    </div>
  );
};

export default SideBar;
