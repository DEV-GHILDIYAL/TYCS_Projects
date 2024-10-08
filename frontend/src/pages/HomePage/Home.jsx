// Home.js
import React, { useState, useEffect } from "react";
import "./Home.css";
import Sidebar from "../../components/SidebarImprove/Sidebar";
import MyProjects from "../../components/MyProjects/MyProjects";
import EventDetailsForm from "../../components/CreateEventForm/EventDetailsFrom";
import Admin from "../../components/Admin/Admin";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import RegisterComponent from "../../components/SetPassword/SetPassword";
import HomeComponent from "../../components/HomeComponent/HomeComponent";
import ProjectDetail from "../../components/ProjectDetail/ProjectDetail";
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";
import ResponsiveWarningPopup from "../../components/ResponsiveWarningPopup/ResponsiveWarningPopup ";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Check if the screen width is less than a certain breakpoint (e.g., 768px)
    if (window.innerWidth < 768) {
      setShowPopup(true);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeComponent setActiveTab={setActiveTab} />;
      case "myProjects":
        return <MyProjects setActiveTab={setActiveTab} />;
      case "admin":
        return <Admin />;
      case "login":
        return <LoginComponent setActiveTab={setActiveTab} />;
      case "register":
        return <RegisterComponent setActiveTab={setActiveTab} />;
      case "createEvent":
        return <EventDetailsForm />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      case "projectDetails":
        return <ProjectDetail />;
      default:
        return token ? <HomeComponent setActiveTab={setActiveTab} /> : <LoginComponent setActiveTab={setActiveTab} />;
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`home ${isSidebarExpanded ? "sidebar-expanded" : ""}`}>
      <Sidebar className="homeSidebar" setActiveTab={setActiveTab} setIsSidebarExpanded={setIsSidebarExpanded} />
      <div className={`home-content ${isSidebarExpanded ? "expanded" : ""}`}>
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
      
      {/* Show the popup if showPopup is true */}
      {showPopup && <ResponsiveWarningPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default Home;
