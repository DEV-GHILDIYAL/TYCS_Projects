import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import img2 from "../../assets/images/images1.png";
import img3 from "../../assets/images/images2.png";
import img4 from "../../assets/images/images3.png";
import img5 from "../../assets/images/images4.png";
import img6 from "../../assets/images/images5.png";
import img from '../../assets/images/images3.png'
import "./CardSection.css";

const CardSection = ({ onViewDetail, searchTerm, searchByRollNumber }) => {
  const [projects, setProjects] = useState([]);
  const images = [img2, img3, img4, img5, img6];
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const data = await response.json();
        setProjects(data.data);
        console.log("all projects", data.data);
      } catch (error) {
        console.error("Unable to fetch projects", error);
      }
    };
    fetchProject();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const term = searchTerm.toLowerCase();
    if (searchByRollNumber) {
      return project.rollno.toString().includes(term);
    } else {
      return project.name.toLowerCase().includes(term);
    }
  });

  const randomImages = filteredProjects.map(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });

  return (
    <div className="card-section">
      {filteredProjects.length > 0 ? (
        filteredProjects.map((project, index) => (
          <Card
            key={project._id}
            image={randomImages[index]}
            title={project.title} 
            description={project.description}
            name={project.name}
            onViewDetail={onViewDetail}
            project={project}
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
