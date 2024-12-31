import React, { useState } from 'react';
import './ExportDataComponent.css';

const ExportDataComponent = () => {
  const [columns, setColumns] = useState({
    rollno: false,
    department: false,
    year: false,
    attendance: false,
    projectName: false,
    studentName: false,
    projectLink: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setColumns((prevColumns) => ({
      ...prevColumns,
      [name]: checked,
    }));
  };

  const handleExport = () => {
    let selectedColumns = [];
    for (const [column, isSelected] of Object.entries(columns)) {
      if (isSelected) {
        selectedColumns.push(column);
      }
    }
    console.log('Columns to export:', selectedColumns);
  };

  return (
    <div className="export-data-container">
      <h2 className="export-data-heading">Export Data</h2>
      <form className="export-data-form">
        <div className="export-data-checkbox-item">
          <label className="export-data-label">
            <input
              type="checkbox"
              name="rollno"
              checked={columns.rollno}
              onChange={handleCheckboxChange}
              className="export-data-checkbox"
            />
            Roll Number
          </label>
        </div>
        <div className="export-data-checkbox-item">
          <label className="export-data-label">
            <input
              type="checkbox"
              name="department"
              checked={columns.department}
              onChange={handleCheckboxChange}
              className="export-data-checkbox"
            />
            Department (CS or IT)
          </label>
        </div>
        <div className="export-data-checkbox-item">
          <label className="export-data-label">
            <input
              type="checkbox"
              name="year"
              checked={columns.year}
              onChange={handleCheckboxChange}
              className="export-data-checkbox"
            />
            Year (e.g., 2024-2025, 2025-2026)
          </label>
        </div>
        <div className="export-data-checkbox-item">
          <label className="export-data-label">
            <input
              type="checkbox"
              name="attendance"
              checked={columns.attendance}
              onChange={handleCheckboxChange}
              className="export-data-checkbox"
            />
            Attendance
          </label>
        </div>
        <div className="export-data-checkbox-item">
          <label className="export-data-label">
            <input
              type="checkbox"
              name="projectName"
              checked={columns.projectName}
              onChange={handleCheckboxChange}
              className="export-data-checkbox"
            />
            Project Name
          </label>
        </div>
        <div className="export-data-checkbox-item">
          <label className="export-data-label">
            <input
              type="checkbox"
              name="studentName"
              checked={columns.studentName}
              onChange={handleCheckboxChange}
              className="export-data-checkbox"
            />
            Student Name
          </label>
        </div>
        <div className="export-data-checkbox-item">
          <label className="export-data-label">
            <input
              type="checkbox"
              name="projectLink"
              checked={columns.projectLink}
              onChange={handleCheckboxChange}
              className="export-data-checkbox"
            />
            Project Link
          </label>
        </div>
      </form>
      <button
        onClick={handleExport}
        className="export-data-button"
      >
        Get Data
      </button>
    </div>
  );
};

export default ExportDataComponent;
