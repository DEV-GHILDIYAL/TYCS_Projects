import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './ExportDataComponent.css';
// import './NewExport.css'

const ExportDataComponent = () => {
  const [columns, setColumns] = useState({
    rollno: false,
    department: false,
    year: false,
    noOfDaysPresent: false,
    noOfDaysAbsent: false,
    projectName: false,
    studentName: false,
    projectLink: false,
    allSessionDetail: false,
    projectNo: false,  // New state for project number
  });

  // Sample data (replace with actual fetched data)
  const data = [
    { userId: "", rollno: '101', department: 'CS', year: '2024-2025', noOfDaysPresent: 180, noOfDaysAbsent: 5, projectName: 'AI Chatbot', studentName: 'John Doe', projectLink: 'https://example.com' },
    { userId: "", rollno: '102', department: 'IT', year: '2024-2025', noOfDaysPresent: 175, noOfDaysAbsent: 10, projectName: 'Blockchain Voting', studentName: 'Jane Doe', projectLink: 'https://example.com' }
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
            {col === 'department' || col === 'year' || col === 'projectNo' ? (
              <div className="export-data-dropdown">
                <label className="export-data-label">
                  {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
                </label>
                <select
                  name={col}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setColumns((prevColumns) => ({
                      ...prevColumns,
                      [name]: value,
                    }));
                  }}
                  className="export-data-select"
                >
                  {col === 'department' ? (
                    <>
                      <option value="CS">CS</option>
                      <option value="IT">IT</option>
                    </>
                  ) : col === 'year' ? (
                    <>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </>
                  ) : col === 'projectNo' ? (
                    <>
                      <option value="Project 1">Project 1</option>
                      <option value="Project 2">Project 2</option>
                    </>
                  ) : null}
                </select>
                
              </div>
            ) : (
              <label className="export-data-label">
                <input
                  type="checkbox"
                  name={col}
                  checked={columns[col]}
                  onChange={handleCheckboxChange}
                  className="export-data-checkbox"
                />
                {col.charAt(0).toUpperCase() + col.slice(1).replace(/([A-Z])/g, ' $1')}
              </label>
            )}
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
