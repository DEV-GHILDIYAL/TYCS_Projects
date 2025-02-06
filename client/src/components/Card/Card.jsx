import React from "react";
import "./Card.css";

const Card = ({ image, title, description, onViewDetail, name, project, profileImage }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <p className="card-name">
          ~{name.length > 10 ? `${name.substring(0, 5)}...` : name.split(" ")[0]}
        </p>
        <button className="main-card-button" onClick={() => onViewDetail(project)}>
          View Details
        </button>
      </div>
      {/* Profile Picture */}
      <img src={profileImage} alt="Profile" className="profile-picture" />
    </div>
  );
};

export default Card;
