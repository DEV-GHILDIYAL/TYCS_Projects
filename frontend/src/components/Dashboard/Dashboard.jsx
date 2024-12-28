import React, { useState } from "react";
import Sidebar from "./Sidebar";
import CardSection from "./CardSection";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
      <CardSection isSidebarOpen={isSidebarOpen} />
    </div>
  );
};

export default Dashboard;
