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
import About from "../../components/About/About";
import Contact from "../../components/Contact/Contact";

const Home = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCard, setSelectedCard] = useState(null); 
  const token = localStorage.getItem("token");


  const renderContent = () => {
    console.log(activeTab);
    switch (activeTab) {
      case "Home":
        return <HomeComponent setActiveTab={setActiveTab} setSelectedCard={setSelectedCard} />;
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
        return <About/>;
      case "contact":
        return <Contact/>;
      case "projectDetails":
        return <ProjectDetail selectedCard={selectedCard} />; // Pass selected card details to ProjectDetail
        default:
          // Render HomeComponent if token exists, otherwise render LoginComponent
          return token ? (
            <HomeComponent 
              setActiveTab={setActiveTab} 
              setSelectedCard={setSelectedCard} 
            />
          ) : (
            <LoginComponent setActiveTab={setActiveTab} />
          );
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
