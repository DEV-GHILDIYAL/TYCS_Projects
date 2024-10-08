import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import img from "../../assets/images/images.png";
import "./CardSection.css";

const CardSection = ({ onViewDetail, searchTerm, searchByRollNumber }) => {
  const [projects, setProjects] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch("http://localhost:5500/", {
        // const response = await fetch("https://tycs-projects-backend-bnlr.onrender.com/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming you're using token-based auth
          },
          credentials: "include",
        });
        const data = await response.json();
        setProjects(data.data);
        console.log("all projects", projects);
      } catch (error) {
        console.error("Unable to fetch projects", error);
      }
    };
    fetchProject();
  }, []);

  // Filtering projects based on search input and mode
  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    if (searchByRollNumber) {
      // If searching by roll number, check only roll number
      return project.rollno.toString().includes(term);
    } else {
      // If searching by name, check only name
      return project.name.toLowerCase().includes(term);
    }
  });

  return (
    <div className="card-section">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project) => (
          <Card
            key={project._id}
            image={img}
            title={project.title} // Retained if you want to show it on the card
            description={project.description} // Retained if you want to show it on the card
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
