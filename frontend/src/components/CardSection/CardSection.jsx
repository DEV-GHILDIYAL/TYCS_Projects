import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import img from "../../assets/images/images.png";
import "./CardSection.css";

const CardSection = ({ onViewDetail }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch("http://localhost:5500/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();
        setProjects(data.data);
        console.log("all projects", projects);
      } catch (error) {
        console.error("Unable to fetch projects", error);
        toast.error("Unable to fetch projects!", { autoClose: 1000 });
      }
    };
    fetchProject();
  }, []);

  return (
    <div className="card-section">
      {projects.length > 0 ? (
        projects.map((project) => (
          <Card
            key={project._id}
            image={img}
            title={project.title}
            description={project.description}
            name={project.name}
            project={project} // Pass the entire project object to the Card component
            onViewDetail={onViewDetail} // Trigger the function when clicked
          />
        ))
      ) : (
        <div className="no-projects-container">
          <p className="no-projects-message">No Projects to Show</p>
        </div>
      )}
    </div>
  );
};

export default CardSection;
