// src/components/RowComponent.jsx
// admin
import React, { useState } from "react";
import { FaLink } from "react-icons/fa"; // Import link icon

export const RowComponentForAttendance = ({ srNo, rollNumber, name, projectName }) => {

  const [attendance, setAttendance] = useState(null); // null, "present", or "absent"

// to track attendance data while admin marks attendance.
//   const [attendanceData, setAttendanceData] = useState([]);

//   const markAttendance = (student, status) => {
//       setAttendanceData(prev => [...prev, { ...student, status }]);
//   };

//  Provide a "Done" button that sends all attendance data to the backend when clicked.
  // <button onClick={submitAttendance}>Done</button>
  
  // const submitAttendance = async () => {
  //     await axios.post('/api/attendance/store', { attendanceData, sessionId });
  // };
  

//   const markAttendance = async (studentId, date, status) => {
//     try {
//         await Attendance.updateOne(
//             { studentId }, // Match the student
//             { $push: { attendance: { date, status } } }, // Add to the attendance array
//             { upsert: true } // Create a new document if it doesn’t exist
//         );
//         console.log('Attendance marked successfully');
//     } catch (error) {
//         console.error('Error marking attendance:', error);
//     }
// };




//   {students.map(student => (
//     <div key={student.rollNo}>
//         <p>{student.name} ({student.rollNo})</p>
//         <button onClick={() => markAttendance(student, 'Present')}>Present</button>
//         <button onClick={() => markAttendance(student, 'Absent')}>Absent</button>
//     </div>
// ))}
  return (
    <tr>
      <td>{srNo}</td>
      <td>{rollNumber}</td>
      <td>{name}</td>
      <td>{projectName}</td>
      <td>
        <button
          style={{
            backgroundColor: attendance === "present" ? "green" : "white",
            color: attendance === "present" ? "white" : "black",
          }}
          onClick={() => setAttendance("present")}
        >
          Present
        </button>
        <button
          style={{
            backgroundColor: attendance === "absent" ? "red" : "white",
            color: attendance === "absent" ? "white" : "black",
          }}
          onClick={() => setAttendance("absent")}
        >
          Absent
        </button>
      </td>
    </tr>
  );
};

export const RowComponentForStudent = ({ srNo, rollNumber, name,noOfDaysPresent, department }) => {
  return (
    <tr>
      <td>{srNo}</td>
      <td>{rollNumber}</td>
      <td>{name}</td>
      <td>{noOfDaysPresent}</td>
      <td>{department}</td>
    </tr>
  );
};

export const RowComponentForProjects = ({ srNo, rollNumber, name, projectName, projectLink }) => {
  return (
    <tr>
      <td>{srNo}</td>
      <td>{rollNumber}</td>
      <td>{name}</td>
      <td>{projectName}</td>
      <td>
        {/* Display the link icon only if a valid projectLink exists */}
        {projectLink ? (
          <a href={projectLink} target="_blank" rel="noopener noreferrer">
            <FaLink size={20} /> {/* The link icon */}
          </a>
        ) : (
          "No link available"
        )}
      </td>
    </tr>
  );
};
