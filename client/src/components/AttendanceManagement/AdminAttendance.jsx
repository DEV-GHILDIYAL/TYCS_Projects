import React,{useState} from "react";
import "./AdminAttendance.css";
// import studentData from "../../data/students";
import { RowComponentForAttendance } from "../RowComponent/RowComponent";
import { useLocation } from "react-router-dom";

const AdminAttendance = () => {
  const location = useLocation();
const { data, sessionToView } = location.state || {};
  // const[main,setMain] = useState([])
console.log("Data and sessionToView:", data, sessionToView);
let main = data
if (data) {
  console.log("Data from session creation:", data);
  main = data.session.students
}

if (sessionToView) {
  console.log("Session to view:", sessionToView);
  main = sessionToView.students
}
  return (
    <div className="admin-attendance-page">
      <div className="content">
        <div className="attendance-head">
          <div className="attendance-head-left">
            <h1>Attendance Management</h1>
            <p>Here you can mark and manage attendance for students.</p>
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
          {main.length  === 0 ? (
              <tr>
                <td colSpan="5">No students found.</td>
              </tr>
            ) : (
              main.map((student, index) => (
                <RowComponentForAttendance
                  key={student.rollNo}
                  srNo={index + 1}
                  rollNumber={student.rollNo}
                  name={student.name}
                  projectName={student.projectName}
                />
              ))
            )}
          </tbody>
        </table>
        <button className="attendance-student-submit">Submit</button>
      </div>
    </div>
  );
};

export default AdminAttendance;
