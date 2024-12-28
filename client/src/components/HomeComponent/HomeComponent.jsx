import React, { useState } from 'react';
import './HomeComponent.css';
import CardSection from '../CardSection/CardSection';
import ProjectDetail from '../ProjectDetail/ProjectDetail';

const HomeComponent = () => {
  const [selectedProject, setSelectedProject] = useState(null); // State to hold selected project
  const [searchTerm, setSearchTerm] = useState(''); // State to hold search term for Name or Roll No
  const [searchByRollNumber, setSearchByRollNumber] = useState(false); // State to toggle search by name or roll number
  const [year, setYear] = useState(''); // State to hold selected batch (2024-2025, 2025-2026)
  const [department, setDepartment] = useState(''); // State to hold selected department (CS/IT)
  const [projectType, setProjectType] = useState(''); // State to hold selected project type (Project 1/Project 2)
  const [batchFilter, setBatchFilter] = useState(''); // State for Batch 1, Batch 2, Batch 3 filter

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

  const handleBatchChange = (event) => {
    setYear(event.target.value); // Set the selected batch filter
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value); // Set the selected department filter
  };

  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value); // Set the selected project type filter
  };

  const handleBatchFilterChange = (event) => {
    setBatchFilter(event.target.value); // Set the selected batch filter (Batch 1, Batch 2, Batch 3)
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
              {searchByRollNumber ? "Search by Name" : "Search by Roll"}
            </button>

            <select
              className="filter-dropdown"
              value={year}
              onChange={handleBatchChange}
            >
              <option value="">Select Year</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
              <option value="2025-2026">2026-2027</option>
              <option value="2025-2026">2027-2028</option>
            </select>

            <select
              className="filter-dropdown"
              value={department}
              onChange={handleDepartmentChange}
            >
              <option value="">Select Department</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
            </select>

            <select
              className="filter-dropdown"
              value={projectType}
              onChange={handleProjectTypeChange}
            >
              <option value="">Select Project)</option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
            </select>

            <select
              className="filter-dropdown"
              value={batchFilter}
              onChange={handleBatchFilterChange}
            >
              <option value="">Select Batch</option>
              <option value="Batch 1">Batch 1</option>
              <option value="Batch 2">Batch 2</option>
              <option value="Batch 3">Batch 3</option>
            </select>
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
          batch={year} // Pass batch filter (2024-2025 or 2025-2026)
          department={department} // Pass department filter (CS or IT)
          projectType={projectType} // Pass project type filter (Project 1 or Project 2)
          batchFilter={batchFilter} // Pass the batch filter (Batch 1, Batch 2, Batch 3)
        />
      )}
    </div>
  );
};

export default HomeComponent;
