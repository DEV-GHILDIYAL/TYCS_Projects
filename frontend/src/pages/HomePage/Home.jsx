import React, { useState } from "react";
import "./Home.css";
import Sidebar from "../../components/SidebarImprove/Sidebar";
import MyProjects from "../../components/MyProjects/MyProjects";
import EventDetailsForm from "../../components/CreateEventForm/EventDetailsFrom";
import Admin from "../../components/Admin/Admin";
import LoginComponent from "../../components/LoginComponent/LoginComponent";
import RegisterComponent from "../../components/RegisterComponent/RegisterComponent";
import HomeComponent from "../../components/HomeComponent/HomeComponent";
const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "Home":
        return <HomeComponent />;
      case "myProjects":
        return <MyProjects setActiveTab={setActiveTab} />;
      case "admin":
        return <Admin />;
      case "login":
        return <LoginComponent />;
      case "register":
        return <RegisterComponent />;
      case 'createEvent':
        return <EventDetailsForm />;
      default:
        return <HomeComponent />;
    }
  };

  return (
    <>
    <div className="home">
      <Sidebar setActiveTab={setActiveTab} />
      <div className="home-content">
        <div className="main-content">
          {renderContent()}
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
