import React from 'react';
import './Sidebar.css';

const Sidebar = ({ setActiveTab }) => {
  return (
    <div className="sidebar">
      <h2>Project Hub</h2>
      <div className="sidebar-content">
        <ul>
          <li onClick={() => setActiveTab('createEvent')}>Home</li>
          <li onClick={() => setActiveTab('myProjects')}>My Projects</li>
          <li onClick={() => setActiveTab('admin')}>Admin</li>
          {/* <li onClick={() => setActiveTab('statistics')}>Statistics</li> */}
        </ul>

        <ul className="auth-links">
          <li onClick={() => setActiveTab('login')}>Login</li>
          <li onClick={() => setActiveTab('register')}>Register</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
