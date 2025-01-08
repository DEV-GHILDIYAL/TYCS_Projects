// src/components/RowComponent.jsx
// admin
import React, { useState } from "react";
import { FaLink } from "react-icons/fa"; // Import link icon
export const RowComponentForAttendance = ({ srNo, rollNumber, name, projectName,sessionId, studentId, date }) => {

  const [attendance, setAttendance] = useState(null); // null, "present", or "absent"

  const markAttendance = async (studentId, date, status, sessionId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/admin/attendance/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId, date, status, sessionId }),
        credentials:"include",
      });

      if (response.ok) {
        console.log("Attendance marked successfully");
        setAttendance(status); // Update the UI
      } else {
        console.error("Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

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
          onClick={() => markAttendance(studentId,date,"Present",sessionId)}
        >
          Present
        </button>
        <button
          style={{
            backgroundColor: attendance === "absent" ? "red" : "white",
            color: attendance === "absent" ? "white" : "black",
          }}
          onClick={() => markAttendance(studentId,date,"Absent",sessionId)}
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

export const RowComponentForProjects = ({ srNo, rollNumber, name, projectName,projectNo, projectLink }) => {
  return (
    <tr>
      <td>{srNo}</td>
      <td>{rollNumber}</td>
      <td>{name}</td>
      <td>{projectName}</td>
      <td>{projectNo}</td>
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
