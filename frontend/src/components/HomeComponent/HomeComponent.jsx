import React, { useState } from 'react';
import './HomeComponent.css';
import CardSection from '../CardSection/CardSection';
import ProjectDetail from '../ProjectDetail/ProjectDetail';

const HomeComponent = () => {
  const [selectedProject, setSelectedProject] = useState(null); // State to hold selected project
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term
  const [searchByRollNumber, setSearchByRollNumber] = useState(false); // State to toggle search by name or roll number

  const handleViewDetail = (projectDetails) => {
    setSelectedProject(projectDetails); // Update the selected project
  };
  
  const handleBack = () => {
    setSelectedProject(null); // Reset selected project to go back
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value); // Update search term as user types
  };

  const toggleSearchMode = () => {
    setSearchByRollNumber(!searchByRollNumber); // Toggle between name and roll number search
    setSearchTerm(''); // Clear the search input when switching modes
  };

  return (
    <div className="home-container">
      {!selectedProject && (
        <>
          <h1 className="header">All Projects</h1>
          <div className="filter-container">
            <input
              type="text"
              className="filter-input"
              placeholder={searchByRollNumber ? "Search by Roll Number..." : "Search by Name..."}
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="toggle-button" onClick={toggleSearchMode}>
              {searchByRollNumber ? "Search by Name" : "Search by Roll No"}
            </button>
          </div>
        </>
      )}
      {selectedProject ? (
        <ProjectDetail project={selectedProject} onBack={handleBack} />
      ) : (
        <CardSection 
          onViewDetail={handleViewDetail} 
          searchTerm={searchTerm} 
          searchByRollNumber={searchByRollNumber} // Pass the search mode
        />
      )}
    </div>
  );
};

export default HomeComponent;
