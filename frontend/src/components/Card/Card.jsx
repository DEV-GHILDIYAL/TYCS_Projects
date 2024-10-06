import React from 'react';
import img from '../../assets/images/images.png';
import './Card.css';
import { useNavigate } from 'react-router-dom';

const Card = ({ image, title, description, location, time, ngoName, setActiveTab}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setActiveTab('projectDetails');
    navigate('/event');
  };

  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        
        <button className="card-button" onClick={handleButtonClick}>
          View detail
        </button>
      </div>
    </div>
  );
};

export default Card;
