// HomeComponent.jsx
import React, { useState } from 'react';
import './HomeComponent.css';
import CardSection from '../CardSection/CardSection';
import ProjectDetail from '../ProjectDetail/ProjectDetail';

const HomeComponent = () => {
  const [selectedProject, setSelectedProject] = useState(null); // State to hold selected project

  const handleViewDetail = (projectDetails) => {
    setSelectedProject(projectDetails); // Update the selected project
  };

  const handleBack = () => {
    setSelectedProject(null); // Reset selected project to go back
  };

  return (
    <div className="home-container">
      {/* Conditionally render the heading based on the selected project */}
      {!selectedProject && <h1 className="header">All Projects</h1>}

      {/* Render Project Detail if a project is selected */}
      {selectedProject ? (
        <ProjectDetail project={selectedProject} onBack={handleBack} /> // Pass the onBack prop
      ) : (
        <CardSection onViewDetail={handleViewDetail} /> // Pass the handler to CardSection
      )}
    </div>
  );
};

export default HomeComponent;
