// MyProjectsComponent.jsx
import React from 'react';
import './MyProjects.css';

const MyProjects = ({ setActiveTab }) => {
  return (
    <div className="my-project-container">
      <h2 className="my-project-header">My Projects</h2>
      
      <div className="projectCard">
        <button onClick={() => setActiveTab('createEvent')} className="add-project-btn">+</button>
        <p className="create-project-text">Create a Project</p>
      </div>
    </div>
  );
};

export default MyProjects;
