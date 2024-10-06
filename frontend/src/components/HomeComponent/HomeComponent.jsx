import React, { useState } from 'react';
import './HomeComponent.css';
import CardSection from '../CardSection/CardSection';

const HomeComponent = () => {
  const [filterValue, setFilterValue] = useState(''); // State to hold input value
  const [isRollNoFilter, setIsRollNoFilter] = useState(false); // State to toggle between name and roll no

  const handleInputChange = (e) => {
    setFilterValue(e.target.value);
  };

  const toggleFilterMode = () => {
    setIsRollNoFilter(!isRollNoFilter); // Toggle between name and roll no
    setFilterValue(''); // Reset the input when toggling
  };

  return (
    <div className="home-container">
      {/* Heading */}
      <h1 className="header">All Projects</h1>

      {/* Filters */}
      <div className="filter-container">
        <input
          type="text"
          value={filterValue}
          onChange={handleInputChange}
          placeholder={isRollNoFilter ? 'Search by Roll No' : 'Search by Name'}
          className="filter-input"
        />
        <button onClick={toggleFilterMode} className="toggle-button">
          {isRollNoFilter ? 'Search by Name' : 'Search by Roll No'}
        </button>
      </div>

      {/* Example: Later you can display filtered data */}
      <CardSection />
    </div>
  );
};

export default HomeComponent;
