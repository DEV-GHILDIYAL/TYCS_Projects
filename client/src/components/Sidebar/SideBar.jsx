import { NavLink } from "react-router-dom";
import { FaFileAlt, FaFolderOpen, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { AiTwotoneFileExclamation } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "./Sidebar.css";

const routes = [
  {
    path: "/",
    name: "Home",
    icon: <FaHome />,
  },
  {
    path: "/my-projects",
    name: "My Projects",
    icon: <FaFolderOpen />,
  },
  {
    path: "/about-us",
    name: "About Us",
    icon: <FaFileAlt />,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/file-manager",
    name: "Management",
    icon: <FaFolderOpen />,
    subRoutes: [
      {
        path: "/management/student",
        name: "Student",
        icon: <FaUser />,
      },
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

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
            <div className="top-area">
              <div className="top_section">
                <AnimatePresence>
                  {isOpen && (
                    <motion.h1
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="logo"
                    >
                      Project Library
                    </motion.h1>
                  )}
                </AnimatePresence>
              </div>
              <section className="routes">
                {routes.map((route, index) => {
                  if (route.subRoutes) {
                    return (
                      <SidebarMenu
                        setIsOpen={setIsOpen}
                        route={route}
                        showAnimation={showAnimation}
                        isOpen={isOpen}
                      />
                    );
                  }

                  return (
                    <NavLink
                      to={route.path}
                      key={index}
                      className="link"
                      activeClassName="active"
                    >
                      <div className="icon">{route.icon}</div>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            variants={showAnimation}
                            initial="hidden"
                            animate="show"
                            exit="hidden"
                            className="link_text"
                          >
                            {route.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </NavLink>
                  );
                })}
              </section>
            </div>

            {/* Add Login and Register buttons */}
            <div className="bottom_section">
              <NavLink to="/login" className="link" activeClassName="active">
                <div className="icon">
                  <FaLock />
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      Login
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
              <NavLink to="/register" className="link" activeClassName="active">
                <div className="icon">
                  <FaUser />
                </div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      Register
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            </div>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
