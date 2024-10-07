import React, { useEffect, useState } from "react";
import "./MyProjects.css";
import ProjectCard from "./ProjectCard";
import { toast } from 'react-toastify'; // Import toast for notifications

const MyProjects = ({ setActiveTab }) => {
  const [hasProject, setHasProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [deployed, setDeployed] = useState("");
  const [github, setGithub] = useState("");
  const [future, setFuture] = useState("");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [linkedin, setLinkedin] = useState("");
  

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await fetch("http://localhost:5500/user", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data);
          setHasProject(true);
        } else {
          setHasProject(false);
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
        setHasProject(false);
        toast.error("Failed to fetch projects. Please try again.", { autoClose: 3000 });
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchUserProjects();
  }, [token]);

  const handleEdit = async (projectId) => {
    try {
      const url = `http://localhost:5500/${projectId}`;
      const method = "PUT";
  
      const projectToEdit = projects.find((proj) => proj._id === projectId);
  
      const requestBody = {
        name: projectToEdit.name,
        rollno: projectToEdit.rollno,
        title: projectToEdit.title,
        description: projectToEdit.description,
        category: projectToEdit.category,
        deployed: projectToEdit.deployed,
        future: projectToEdit.future,
        github: projectToEdit.github,
        twitter: projectToEdit.twitter,
        linkedin: projectToEdit.linkedin,
        instagram: projectToEdit.instagram,
      };
  
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
        credentials: "include",
      });
  
      if (response.ok) {
        toast.success("Project has been updated!", { autoClose: 1000 });
        setProjects((prevProjects) =>
          prevProjects.map((proj) =>
            proj._id === projectId ? { ...proj, ...requestBody } : proj
          )
        );
      } else {
        toast.error("Error saving project!", { autoClose: 1000 });
      }
    } catch (error) {
      console.error("Error occurred while saving Project:", error);
      toast.error("Unable to save project!", { autoClose: 1000 });
    }
  };
  
  const resetForm = () => {
    setName("");
    setRollno("");
    setTitle("");
    setDescription("");
    setCategory("");
    setDeployed("");
    setGithub("");
    setFuture("");
    setTwitter("");
    setInstagram("");
    setLinkedin("");
  };
  

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5500/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId)); // Use projectId here
        toast.success("Project deleted!", { autoClose: 1000 });
      } else {
        toast.error("Error deleting project!", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Server Error deleting project!", { autoClose: 1000 });
    }
  };

  return (
    <div className="my-project-container">
      <h2 className="my-project-header">My Projects</h2>
      
      {/* Show loading state */}
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <>
          {/* Conditionally render projects */}
          {hasProject ? (
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <div className="projectCard">
              <button
                onClick={() => setActiveTab("createEvent")}
                className="add-project-btn"
              >
                +
              </button>
              <p className="create-project-text">Create a Project</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyProjects;
