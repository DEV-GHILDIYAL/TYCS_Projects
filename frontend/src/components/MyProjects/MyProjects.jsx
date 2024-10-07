import React, { useEffect, useState } from "react";
import "./MyProjects.css";
import EventDetailsForm from '../CreateEventForm/EventDetailsFrom'; 
import { toast } from "react-toastify"; // Import toast for notifications
import img from '../../assets/images/images.png';
import './ProjectCard.css'

const MyProjects = ({ setActiveTab }) => {
  const [hasProject, setHasProject] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectData, setEditingProjectData] = useState({});
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

  const [isEditing, setIsEditing] = useState(false);
  const [showHeader, setShowHeader] = useState(true); // New state for header visibility

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
        toast.error("Failed to fetch projects. Please try again.", {
          autoClose: 3000,
        });
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchUserProjects();
  }, [token]);

  const handleEdit = async (projectId) => {
    const projectToEdit = projects.find((proj) => proj._id === projectId);
    setEditingProjectId(projectId);
    setEditingProjectData(projectToEdit);
    setName(projectToEdit.name);
    setRollno(projectToEdit.rollno);
    setTitle(projectToEdit.title);
    setDescription(projectToEdit.description);
    setCategory(projectToEdit.category);
    setDeployed(projectToEdit.deployed);
    setGithub(projectToEdit.github);
    setFuture(projectToEdit.future);
    setTwitter(projectToEdit.twitter);
    setInstagram(projectToEdit.instagram);
    setLinkedin(projectToEdit.linkedin);
    
    setShowHeader(false); // Hide the header when editing
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
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        ); // Use projectId here
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
      {/* Conditionally render the header based on showHeader state */}
      {showHeader && <h2 className="my-project-header">My Projects</h2>}
    
      {/* Show loading state */}
      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <>
          {/* Check if we are in edit mode */}
          {editingProjectId ? (
            <EventDetailsForm
              editingProjectId={editingProjectId}
              initialData={editingProjectData} // Pass the editing data to the form
              setEditingProjectId={setEditingProjectId}
              setShowHeader={setShowHeader} // Optionally pass function to show the header again
            />
          ) : (
            <>
              {/* Check if there are any projects */}
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div className="project-card" key={project._id}>
                    <img src={img} alt={project.title} className="project-image" />
                    <div>
                      <h3 className="project-titles">{project.title}</h3>
                    </div>
                    <div className="project-buttons">
                      <button className="edit-button" onClick={() => handleEdit(project._id)}>Edit</button>
                      <button className="delete-button" onClick={() => handleDelete(project._id)}> Delete</button>
                    </div>
                  </div>
                ))
              ) : (
                /* Show the "Create a Project" button if there are no projects */
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
        </>
      )}
    </div>
  );
};

export default MyProjects;
