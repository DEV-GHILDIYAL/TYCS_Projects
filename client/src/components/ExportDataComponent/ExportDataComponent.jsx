import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExportDataComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  // Checkboxes (Admin selections)
  const [selectedFields, setSelectedFields] = useState({
    rollno: false,
    name: false,
    email: false,
    daysPresent: false,
    daysAbsent: false,
    projectName: false,
    projectLink: false,
    projectNo: false,
    sessions: false,
  });

  // Handle checkbox selection
  const handleFieldChange = (field) => {
    setSelectedFields((prevFields) => ({
      ...prevFields,
      [field]: !prevFields[field],
    }));
  };

  // Fetch and export data  //Working
  const fetchData = async () => {
      setLoading(true);
      try {
          // Create query params based on filters
          const params = new URLSearchParams();
          if (selectedDepartment) params.append('department', selectedDepartment);
          if (selectedYear) params.append('year', selectedYear);
          if (selectedProject) params.append('project', selectedProject);
  
          const response = await fetch(
              `${import.meta.env.VITE_BACK_URL}/admin/exportdata?${params.toString()}`,
              {
                  method: "GET",
                  credentials: "include",
              }
          );
  
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const result = await response.json();
          
          if (!result.success || !result.data || !result.data.length) {
              throw new Error('No data available for export');
          }
  
          // Filter columns based on selected fields
          const filteredData = result.data.map(row => {
              const filteredRow = {};
              
              if (selectedFields.rollno) filteredRow['Roll No'] = row['Roll No'];
              if (selectedFields.name) filteredRow['Name'] = row['Name'];
              if (selectedFields.email) filteredRow['Email'] = row['Email'];
              if (selectedFields.daysPresent) filteredRow['Total Present'] = row['Total Present'];
              if (selectedFields.daysAbsent) filteredRow['Total Absent'] = row['Total Absent'];
              if (selectedFields.projectName) filteredRow['Project Title'] = row['Project Title'];
              if (selectedFields.projectLink) filteredRow['Project Link'] = row['Project Link'];
              if (selectedFields.projectNo) {
                  filteredRow['Project Github'] = row['Github Link'];
              }
              
              // Add session columns if selected
              if (selectedFields.sessions) {
                  Object.keys(row).forEach(key => {
                      if (key.includes('Project One -') || key.includes('Project Two -')) {
                          filteredRow[key] = row[key];
                      }
                  });
              }
              
              return filteredRow;
          });
  
          // Create workbook
          const wb = XLSX.utils.book_new();
          const ws = XLSX.utils.json_to_sheet(filteredData);
  
          // Add some styling
          const colWidths = {};
          Object.keys(filteredData[0] || {}).forEach(key => {
              colWidths[key] = { wch: Math.max(key.length, 15) };
          });
          ws['!cols'] = colWidths;
  
          XLSX.utils.book_append_sheet(wb, ws, "Project Library Data");
  
          // Save file
          XLSX.writeFile(wb, "ProjectLibrary_Export.xlsx");
  
      } catch (error) {
          console.error("Export error:", error);
          alert(error.message || "Failed to export data. Please try again.");
      }
      setLoading(false);
  };


  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", borderRadius: "8px", width: "350px" }}>
      <h2>EXPORT DATA</h2>
      <div>
        <label>Department</label>
        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)}>
          <option value="">All</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
        </select>
      </div>
      <div>
        <label>Year</label>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">All</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>
      <div>
        <label>Project No</label>
        <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
          <option value="">All</option>
          <option value="Project One">Project One</option>
          <option value="Project Two">Project Two</option>
        </select>
      </div>
      {Object.keys(selectedFields).map((field) => (
        <div key={field}>
          <input 
            type="checkbox" 
            checked={selectedFields[field]} 
            onChange={() => handleFieldChange(field)} 
          />
          <label>{field.replace(/([A-Z])/g, " $1").trim()}</label>
        </div>
      ))}
      <button 
        onClick={fetchData} 
        disabled={loading}
        style={{ 
          marginTop: "15px",
          opacity: loading ? 0.7 : 1 
        }}
      >
        {loading ? "Exporting..." : "Export to Excel"}
      </button>
    </div>
  );
};

export default ExportDataComponent;
