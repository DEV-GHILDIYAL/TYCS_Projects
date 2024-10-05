import React, { useState } from 'react';
import './HomeComponent.css';
import CardSection from '../CardSection/CardSection';

const HomeComponent = () => {
  const [nameFilter, setNameFilter] = useState('');
  const [rollNoFilter, setRollNoFilter] = useState('');

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleRollNoChange = (e) => {
    setRollNoFilter(e.target.value);
  };

  return (
    <div className="home-container">
      {/* Heading */}
      <h1 className="header">All Projects</h1>

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="name-filter">Filter by Name:</label>
          <input 
            type="text" 
            id="name-filter" 
            value={nameFilter} 
            onChange={handleNameChange} 
            placeholder="Enter name" 
          />
        </div>
        <div className="filter-group">
          <label htmlFor="rollno-filter">Filter by Roll No:</label>
          <input 
            type="text" 
            id="rollno-filter" 
            value={rollNoFilter} 
            onChange={handleRollNoChange} 
            placeholder="Enter roll number" 
          />
        </div>
      </div>

      {/* Example: Later you can display filtered data */}
      <CardSection/>
    </div>
  );
};

export default HomeComponent;
