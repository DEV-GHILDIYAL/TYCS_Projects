import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/SidebarImprove/Sidebar";
import MyProjects from "../../components/MyProjects/MyProjects";
import EventDetailsForm from "../../components/CreateEventForm/EventDetailsFrom";
import Admin from "../../components/Admin/Admin";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import RegisterComponent from "../../components/SetPassword/SetPassword";
import HomeComponent from "../../components/HomeComponent/HomeComponent";
import ProjectDetail from "../../components/ProjectDetail/ProjectDetail";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <ProjectDetail/>;
        // return <HomeComponent />;
      case "myProjects":
        return <MyProjects setActiveTab={setActiveTab} />;
      case "admin":
        return <Admin />;
      case "login":
        return <LoginComponent setActiveTab={setActiveTab} />;
      case "register":
        return <RegisterComponent setActiveTab={setActiveTab}/>;
      case "createEvent":
        return <EventDetailsForm />;
      case "projectDetails":
        return <ProjectDetail />;
      default:
        return <HomeComponent />;
    }
  };

  return (
    <div className="home">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="home-content">
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Home;
