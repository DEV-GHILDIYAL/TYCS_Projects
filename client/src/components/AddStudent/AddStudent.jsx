import React, { useState } from "react";

import "./AddStudent.css";
const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    rollNumber: "",
    batch: "",
    department: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleAddStudent = () => {
    console.log("Student Data:", student);
    alert("Student Added Successfully!");
    // Add API call logic here
  };

  return (
    <div className="add-student-container">
      <div className="add-student-card">
        <h2 className="add-student-title">Add Student</h2>
        <form>
          {/* Student Name */}
          <div className="add-student-input-group">
            <label className="add-student-label">Student Name</label>
            <input
              type="text"
              name="name"
              value={student.name}
              onChange={handleInputChange}
              className="add-student-input"
              placeholder="Enter student name"
            />
          </div>

          {/* Email */}
          <div className="add-student-input-group">
            <label className="add-student-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={student.email}
              onChange={handleInputChange}
              className="add-student-input"
              placeholder="Enter email address"
            />
          </div>

          {/* Roll Number */}
          <div className="add-student-input-group">
            <label className="add-student-label">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={student.rollNumber}
              onChange={handleInputChange}
              className="add-student-input"
              placeholder="Enter roll number"
            />
          </div>

          {/* Batch */}
          <div className="add-student-input-group">
            <label className="add-student-label">Batch</label>
            <select
              name="batch"
              value={student.batch}
              onChange={handleInputChange}
              className="add-student-select"
            >
              <option value="" disabled>
                Select Batch
              </option>
              <option value="2022-2024">2022-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>

          {/* Department */}
          <div className="add-student-input-group">
            <label className="add-student-label">Department</label>
            <select
              name="department"
              value={student.department}
              onChange={handleInputChange}
              className="add-student-select"
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="CS">Computer Science</option>
              <option value="IT">Information Technology</option>
            </select>
          </div>

          {/* Add Student Button */}
          <div className="add-student-btn-container">
            <button
              type="button"
              onClick={handleAddStudent}
              className="add-student-btn"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
