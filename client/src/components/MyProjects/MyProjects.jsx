import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./MyProjects.css";
import EventDetailsForm from "../CreateEventForm/EventDetailsFrom";
import { toast } from "react-toastify"; // Import toast for notifications
import img from "../../assets/images/images1.png";
import "./ProjectCard.css";
const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingProjectData, setEditingProjectData] = useState({});
  const [loading, setLoading] = useState(true); // State for loading
  const [showHeader, setShowHeader] = useState(true); // New state for header visibility

  useEffect(() => {
    const fetchUserProjects = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data && Array.isArray(data.data)) {
          setProjects(data.data);
        }
      } catch (error) {
        console.error("Error fetching user projects:", error);
        toast.error("Failed to fetch projects. Please try again.", {
          autoClose: 3000,
        });
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchUserProjects();
  }, []);

  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/${projectId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== projectId)
        );
        toast.success("Project deleted!", { autoClose: 1000 });
      } else {
        toast.error("Error deleting project!", { autoClose: 1000 });
      }
    } catch (error) {
      toast.error("Server Error deleting project!", { autoClose: 1000 });
    }
  };

  const handleEdit = (projectId) => {
    const projectToEdit = projects.find((proj) => proj._id === projectId);
    setEditingProjectId(projectId);
    setEditingProjectData(projectToEdit);
    setShowHeader(false); // Hide the header when editing
  };

  const canAddProject = projects.length < 2;
  const availableFields = ["Project One", "Project Two"].filter(
    (field) => !projects.some((project) => project.category === field)
  );

  return (
    <div className={`my-project-container ${editingProjectId ? "editing-mode" : ""}`}>
      {/* Conditionally render the header based on showHeader state */}
      {showHeader && <h2 className="my-project-header">My Projects</h2>}

      {loading ? (
        <p>Loading projects...</p>
      ) : (
        <>
          {editingProjectId ? (
            <EventDetailsForm className="event-details-form"
              editingProjectId={editingProjectId}
              initialData={editingProjectData}
              setEditingProjectId={setEditingProjectId}
              setShowHeader={setShowHeader}
            />
          ) : (
            <>
            <div className="project-card-container">
              {projects.map((project) => (
                <div className="project-card" key={project._id}>
                  <img
                    src={img}
                    alt={project.title}
                    className="project-image"
                  />
                  <div>
                    <h3 className="project-titles">{project.title}</h3>
                  </div>
                  <div className="project-buttons">
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(project._id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}

              {canAddProject && (
                <div className="projectCard">
                  <NavLink
                    to={{
                      pathname: "/create-project",
                      state: { availableFields },
                    }}
                    className="add-project-btn"
                  >
                    +
                  </NavLink>
                  <p className="create-project-text">Create a Project</p>
                </div>
              )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyProjects;