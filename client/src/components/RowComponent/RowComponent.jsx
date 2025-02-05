// src/components/RowComponent.jsx
// admin
import React, { useState, useEffect } from "react";
import { FaLink } from "react-icons/fa";
// import FaLink from "@fortawesome/react-fontawesome";
export const RowComponentForAttendance = ({
  srNo,
  rollNo,//rollNo
  //batch
  name,
  projectName,
  sessionId,
  userId,
  date,
  onAttendanceMarked,
}) => {
  const [attendance, setAttendance] = useState(null); // null, "present", or "absent"
  const [loading, setLoading] = useState(true); // Loading state for fetching attendance

  // Fetch attendance status for the student
  const fetchAttendanceStatus = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/admin/attendance/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, date, sessionId }),
          credentials: "include", // Pass cookies for authentication
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAttendance(data.status); // "present" or "absent"
      } else {
        console.error("Failed to fetch attendance status:", data.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching attendance status:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch attendance when the component mounts
  useEffect(() => {
    fetchAttendanceStatus();
  }, []);

  const markAttendance = async (status) => {
    try {
      // console.log(userId);
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/admin/attendance/mark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, date, status, sessionId }),
          credentials: "include", // Pass cookies for authentication
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Attendance marked successfully:", data);
        setAttendance(status); // Update the UI to reflect the attendance
        onAttendanceMarked(userId); // Notify parent component
      } else {
        console.error("Failed to mark attendance:", data.error || "Unknown error");
        alert(`Failed to mark attendance: ${data.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("An error occurred while marking attendance. Please try again.");
    }
  };

  return (
    <tr>
      <td>{srNo}</td>
      <td>{rollNo}</td>
      <td>{name}</td>
      <td>{projectName}</td>
      <td>
        {loading ? (
          <span>Loading...</span>
        ) : attendance ? (
          <span style={{ color: attendance === "present" ? "green" : "red" }}>
            {attendance === "present" ? "Present" : "Absent"}
          </span>
        ) : (
          <>
            <button
              style={{
                backgroundColor: "white",
                color: "black",
              }}
              onClick={() => markAttendance("present")}
            >
              Present
            </button>
            <button
              style={{
                backgroundColor: "white",
                color: "black",
              }}
              onClick={() => markAttendance("absent")}
            >
              Absent
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export const RowComponentForStudent = ({ srNo, rollNo, name,noOfDaysPresent, department }) => {
  return (
    <tr>
      <td>{srNo}</td>
      <td>{rollNo}</td>
      <td>{name}</td>
      <td>{noOfDaysPresent}</td>
      <td>{department}</td>
    </tr>
  );
};

export const RowComponentForProjects = ({ srNo, rollNo, name, projectName,projectNo, projectLink }) => {
  return (
    <tr>
      <td>{srNo}</td>
      <td>{rollNo}</td>
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
