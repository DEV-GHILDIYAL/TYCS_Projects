// CardSection.jsx
import React,{useEffect, useState} from 'react';
import Card from '../Card/Card';
import img from '../../assets/images/images.png';
import './CardSection.css';

const CardSection = ({ onViewDetail }) => {
  const [projects,setProjects] = useState([])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch("http://localhost:5500/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`, 
          },
          credentials: "include",
        });
        const data = await response.json();
        setProjects(data.data);
        console.log("all projects ",projects)
      } catch (error) {
        console.error("Unable to fetch projects", error);
        toast.success("Fetched all projects!", { autoClose: 1000 });
      }
    };
    fetchProject();
  }, []);
  // }, [token]);

  return (
    <div className="card-section">
      {projects.map((project, index) => (
        <Card
          key={project._id}
          image={img}
          title={project.title}
          description={project.description}
          name={project.name} 
          onViewDetail={onViewDetail} 
        />
      ))}
    </div>
  );
};

export default CardSection;
