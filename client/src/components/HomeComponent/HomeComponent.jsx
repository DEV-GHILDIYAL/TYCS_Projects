import React, { useState } from 'react';
import './HomeComponent.css';
import CardSection from '../CardSection/CardSection';
import ProjectDetail from '../ProjectDetail/ProjectDetail';
import HorizontalCardSection from '../HorizontalCardSection/HorizontalCardSection';
import { FaTh, FaList } from 'react-icons/fa';

const HomeComponent = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchByRollNumber, setSearchByRollNumber] = useState(false);
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [projectType, setProjectType] = useState('');
  const [batchFilter, setBatchFilter] = useState('');
  const [isGridView, setIsGridView] = useState(true);

  const handleViewDetail = (projectDetails) => {
    setSelectedProject(projectDetails);
  };

  const handleBack = () => {
    setSelectedProject(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSearchMode = () => {
    setSearchByRollNumber(!searchByRollNumber);
    setSearchTerm('');
  };

  const handleBatchChange = (event) => {
    setYear(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleProjectTypeChange = (event) => {
    setProjectType(event.target.value);
  };

  const handleBatchFilterChange = (event) => {
    setBatchFilter(event.target.value);
  };

  const toggleGridView = () => {
    setIsGridView(!isGridView);
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
              <option value="">Select Project</option>
              <option value="Project One">Project 1</option>
              <option value="Project Two">Project 2</option>
            </select>
            <select
              className="filter-dropdown"
              value={batchFilter}
              onChange={handleBatchFilterChange}
            >
              <option value="">Select Batch</option>
              <option value="Batch1">Batch 1</option>
              <option value="Batch2">Batch 2</option>
              <option value="Batch3">Batch 3</option>
            </select>
            <div className="view-toggle-container">
              <button className="view-toggle-button" onClick={toggleGridView}>
                {isGridView ? <FaList /> : <FaTh />}
              </button>
            </div>
          </div>
        </>
      )}
      {selectedProject ? (
        <ProjectDetail project={selectedProject} onBack={handleBack} />
      ) : (
        <>
          {isGridView ? (
            <HorizontalCardSection 
              onViewDetail={handleViewDetail} 
              searchTerm={searchTerm} 
              searchByRollNumber={searchByRollNumber}
              batch={year} 
              department={department} 
              projectType={projectType} 
              batchFilter={batchFilter}
            />
          ) : (
            <CardSection 
              onViewDetail={handleViewDetail} 
              searchTerm={searchTerm} 
              searchByRollNumber={searchByRollNumber}
              batch={year} 
              department={department} 
              projectType={projectType} 
              batchFilter={batchFilter}
            />
          )}
        </>
      )}
    </div>
  );
};

export default HomeComponent;
