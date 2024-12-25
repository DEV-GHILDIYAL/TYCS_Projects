// src/components/RowComponent.jsx
import React, { useState } from "react";

export const RowComponentForAttendance = ({ srNo, rollNumber, name, projectName }) => {
  const [attendance, setAttendance] = useState(null); // null, "present", or "absent"

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
      <td>{projectLink}</td>
    </tr>
  );
};
