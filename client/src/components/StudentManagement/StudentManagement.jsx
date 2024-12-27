// src/pages/AdminAttendance.jsx

import "./StudentManagement.css";
import student from "../../data/students"
import { RowComponentForStudent } from "../RowComponent/RowComponent";

const ProjectManagement = () => {
  return (
    <div className="admin-attendance-page">
      <div className="content">
        <h1>Student Management</h1>
        <p>Here you can mark and manage attendance for students.</p>
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>No Of Days Presnet</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {student.map((student, index) => (
              <RowComponentForStudent
                key={student.rollNumber}
                srNo={index + 1}
                rollNumber={student.rollNumber}
                name={student.name}
                noOfDaysPresent={student.noOfDayPresent}
                department={student.department}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManagement;
