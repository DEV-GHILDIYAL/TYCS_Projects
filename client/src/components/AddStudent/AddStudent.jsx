import React, { useState } from "react";

import "./AddStudent.css";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    rollNumber: "",
    year: "",
    department: "",
    batchGroup: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleAddStudent = () => {
    if (
      !student.name ||
      !student.email ||
      !student.rollNumber ||
      !student.batch ||
      !student.department ||
      !student.batchGroup
    ) {
      alert("Please fill out all fields!");
      return;
    }

    console.log("Student Data:", student);
    alert("Student Added Successfully!");
    // Add API call logic here
  };

  return (
    <div className="add-student-container">
      <div className="add-student-card">
        <h2 className="add-student-title">Add Student</h2>
        <form>
          {/* Grouped Name, Email, and Roll Number */}
          <div className="add-student-input-row">
            {/* Name */}
            <div className="add-student-input-group">
              <label className="add-student-label">Name</label>
              <input
                type="text"
                name="name"
                value={student.name}
                onChange={handleInputChange}
                className="add-student-input"
                placeholder="Enter student name"
                required
              />
            </div>

            {/* Email */}
            <div className="add-student-input-group">
              <label className="add-student-label">Email</label>
              <input
                type="email"
                name="email"
                value={student.email}
                onChange={handleInputChange}
                className="add-student-input"
                placeholder="Enter email address"
                required
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
                required
              />
            </div>
          </div>

          {/* Batch */}
          <div className="add-student-input-group">
            <label className="add-student-label">Year</label>
            <select
              name="batch"
              value={student.year}
              onChange={handleInputChange}
              className="add-student-select"
              required
            >
              <option value="" disabled>
                Select Year
              </option>
              <option value="2022-2024">2022-2024</option>
              <option value="2024-2025">2024-2025</option>
              <option value="2025-2026">2025-2026</option>
            </select>
          </div>

          {/* Batch Group */}
          <div className="add-student-input-group">
            <label className="add-student-label">Batch Group</label>
            <select
              name="batchGroup"
              value={student.batchGroup}
              onChange={handleInputChange}
              className="add-student-select"
              required
            >
              <option value="" disabled>
                Select Batch Group
              </option>
              <option value="Batch1">Batch1</option>
              <option value="Batch2">Batch2</option>
              <option value="Batch3">Batch3</option>
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
              required
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
