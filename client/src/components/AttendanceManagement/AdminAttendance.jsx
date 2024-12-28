import React, { useState } from "react";
import "./AdminAttendance.css";
import studentData from "../../data/students";
import { RowComponentForAttendance } from "../RowComponent/RowComponent";

const AdminAttendance = () => {
  // State for filters
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
  const [batchFilter, setBatchFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [studentFilter, setStudentFilter] = useState("");

  // Filtered students based on selected filters
  const filteredStudents = studentData.filter((student) => {
    const matchesDepartment = departmentFilter
      ? student.department === departmentFilter
      : true;
    const matchesProject = projectFilter
      ? student.projectType === projectFilter
      : true;
    const matchesBatch = batchFilter ? student.batch === batchFilter : true;
    const matchesYear = yearFilter ? student.year === yearFilter : true;

    const matchesStudent = studentFilter
      ? student.name.toLowerCase().includes(studentFilter.toLowerCase())
      : true;

    return (
      matchesDepartment && matchesProject && matchesBatch && matchesStudent && matchesYear
    );
  });

  return (
    <div className="admin-attendance-page">
      <div className="content">
        <div className="attendance-head">
          <div className="attendance-head-left">
            <h1>Attendance Management</h1>
            <p>Here you can mark and manage attendance for students.</p>
          </div>
          <div className="attendance-head-right">
            {/* Filters Section */}
            <div className="filters">
              <label>Department:</label>
              <select
                onChange={(e) => setDepartmentFilter(e.target.value)}
                value={departmentFilter}
              >
                <option value="">All</option>
                <option value="CS">CS</option>
                <option value="IT">IT</option>
              </select>
              {/* <label>Year:</label>
              <select
                onChange={(e) => setYearFilter(e.target.value)}
                value={yearFilter}
              >
                <option value="">All</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select> */}

              <label>Project:</label>
              <select
                onChange={(e) => setProjectFilter(e.target.value)}
                value={projectFilter}
              >
                <option value="">All</option>
                <option value="Project1">Project 1</option>
                <option value="Project2">Project 2</option>
              </select>

              <label>Batch:</label>
              <select
                onChange={(e) => setBatchFilter(e.target.value)}
                value={batchFilter}
              >
                <option value="">All</option>
                <option value="Batch1">Batch 1</option>
                <option value="Batch2">Batch 2</option>
                <option value="Batch3">Batch 3</option>
              </select>

              <label>Student Name:</label>
              <input
                type="text"
                placeholder="Search by name"
                value={studentFilter}
                onChange={(e) => setStudentFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Project Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5">No students found.</td>
              </tr>
            ) : (
              filteredStudents.map((student, index) => (
                <RowComponentForAttendance
                  key={student.rollNumber}
                  srNo={index + 1}
                  rollNumber={student.rollNumber}
                  name={student.name}
                  projectName={student.projectName}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAttendance;
