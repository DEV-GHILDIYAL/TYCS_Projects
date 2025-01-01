// src/pages/AdminAttendance.jsx
//admin
import "./ProjectManagement.css";
// import student from "../../data/students"
import { toast, Slide } from "react-toastify";
import { RowComponentForProjects } from "../RowComponent/RowComponent"
import { useState,useEffect } from "react";

// getproject
const ProjectManagement = () => {
    const [allprojects, setallprojects] = useState([]);
  

      useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await fetch(`http://localhost:4000/admin/getproject`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Include cookies if needed
            });
    
            const data = await response.json();
            if (response.ok) {
              setallprojects(data.data || []); // Assuming `data` contains `data` field with students array
              toast.success("Data fetched!", {
                position: "top-right",
                theme: "light",
                transition: Slide,
                autoClose: 1000,
              });
            } else {
              console.error("Server error:", data.message);
              toast.error("Project data is not fetched!", {
                position: "top-right",
                theme: "dark",
                transition: Slide,
                autoClose: 1000,
              });
            }
          } catch (error) {
            console.error("Failed to fetch projects:", error);
            toast.error("Failed to fetch projects. Please try again!", {
              position: "top-right",
              theme: "dark",
              transition: Slide,
              autoClose: 1000,
            });
          }
        };
    
        fetchProjects();
      }, []); 
  return (
    <div className="admin-attendance-page">
      <div className="content">
        <h1>Project Management</h1>
        <p>Here you can mark and manage attendance for students.</p>
        <table>
          <thead>
            <tr>
              <th>Sr No</th>
              <th>Roll Number</th>
              <th>Student Name</th>
              <th>Project Name</th>
              <th>Project Link</th>
            </tr>
          </thead>
          <tbody>
            {allprojects.map((student, index) => (
              <RowComponentForProjects
                key={student.rollno}
                srNo={index + 1}
                rollNumber={student.rollno}
                name={student.name}
                projectName={student.title}
                projectLink={student.deployed}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectManagement;
