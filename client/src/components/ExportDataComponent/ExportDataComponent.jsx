import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
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

  // Sample data (replace with actual fetched data)
  const data = [
    { rollno: '101', department: 'CS', year: '2024-2025', attendance: '90%', projectName: 'AI Chatbot', studentName: 'John Doe', projectLink: 'https://example.com' },
    { rollno: '102', department: 'IT', year: '2024-2025', attendance: '85%', projectName: 'Blockchain Voting', studentName: 'Jane Doe', projectLink: 'https://example.com' }
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setColumns((prevColumns) => ({
      ...prevColumns,
      [name]: checked,
    }));
  };

  const handleExport = () => {
    let selectedColumns = Object.keys(columns).filter(col => columns[col]);

    if (selectedColumns.length === 0) {
      alert('Please select at least one column to export.');
      return;
    }

    // Filter the data to include only selected columns
    const filteredData = data.map(row => {
      let filteredRow = {};
      selectedColumns.forEach(col => {
        filteredRow[col] = row[col];
      });
      return filteredRow;
    });

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Exported Data');

    // Generate Excel file and trigger download
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'exported_data.xlsx');
  };

  return (
    <div className="export-data-container">
      <h2 className="export-data-heading">Export Data</h2>
      <form className="export-data-form">
        {Object.keys(columns).map((col) => (
          <div key={col} className="export-data-checkbox-item">
            <label className="export-data-label">
              <input
                type="checkbox"
                name={col}
                checked={columns[col]}
                onChange={handleCheckboxChange}
                className="export-data-checkbox"
              />
              {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')} {/* Format column names */}
            </label>
          </div>
        ))}
      </form>
      <button onClick={handleExport} className="export-data-button">
        Export to Excel
      </button>
    </div>
  );
};

export default ExportDataComponent;
