// src/pages/AdminAttendance.jsx
import React, { useState } from "react";
import "./StudentManagement.css";
import student from "../../data/students";
import { RowComponentForStudent } from "../RowComponent/RowComponent";

const StudentManagement = () => {
  const [filters, setFilters] = useState({
    department: "",
    batch: "",
    year: "",
    projectNumber: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredStudents = student.filter((stud) => {
    return (
      (!filters.department || stud.department === filters.department) &&
      (!filters.batch || stud.batch === filters.batch) &&
      (!filters.year || stud.year === filters.year) &&
      (!filters.projectNumber || stud.projectNumber === filters.projectNumber) &&
      (!filters.category || stud.category === filters.category)
    );
  });

  return (
    <div className="admin-attendance-page">
      <div className="content">
        <h1>Student Management</h1>
        <p>Here you can mark and manage attendance for students.</p>

        {/* Filter Section */}
        <div className="filter-section">
          <label>
            Department:
            <select name="department" value={filters.department} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="CS">CS</option>
              <option value="IT">IT</option>
            </select>
          </label>

          <label>
            Batch:
            <select name="batch" value={filters.batch} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="batch1">Batch 1</option>
              <option value="batch2">Batch 2</option>
              <option value="batch3">Batch 3</option>
            </select>
          </label>

          <label>
            Year:
            <select name="year" value={filters.year} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </label>

          <label>
            Project Number:
            <select name="projectNumber" value={filters.projectNumber} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="Project1">Project 1</option>
              <option value="Project2">Project 2</option>
            </select>
          </label>

          <label>
            Category:
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">All</option>
              <option value="web development">Web Development</option>
              <option value="game dev">Game Development</option>
              <option value="app dev">App Development</option>
              <option value="ml al">ML/AI</option>
            </select>
          </label>
        </div>

        {/* Student Table */}
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>No Of Days Present</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((stud, index) => (
              <RowComponentForStudent
                key={stud.rollNumber}
                srNo={index + 1}
                rollNumber={stud.rollNumber}
                name={stud.name}
                noOfDaysPresent={stud.noOfDayPresent}
                department={stud.department}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
