// src/pages/AdminAttendance.jsx

import "./AdminAttendance.css";
import student from "../../data/students"
import { RowComponentForAttendance } from "../RowComponent/RowComponent";

const AdminAttendance = () => {
  return (
    <div className="admin-attendance-page">
      <div className="content">
        <h1>Attendance Management</h1>
        <p>Here you can mark and manage attendance for students.</p>
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
            {student.map((student, index) => (
              <RowComponentForAttendance
                key={student.rollNumber}
                srNo={index + 1}
                rollNumber={student.rollNumber}
                name={student.name}
                projectName={student.projectName}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAttendance;
