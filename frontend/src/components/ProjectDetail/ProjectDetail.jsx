import React from 'react';
import './ProjectDetail.css';

// Import Font Awesome components
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ProjectDetail = ({ project, onBack }) => {
    return (
        <div className="project-detail-container">
            <div className="title-button-container">
                <button onClick={onBack} className="back-button">
                    <FontAwesomeIcon icon={faArrowLeft} className="back-button-icon" />
                    Back
                </button>
                <h2 className="project-title">{project.title}</h2>
            </div>

            <div className="project-detail-row">
                <div><strong>Name:</strong> {project.name}</div>
                <div><strong>Roll Number:</strong> {project.rollno}</div>
                <div><strong>Category:</strong> {project.category}</div>
            </div>

            <div className="project-detail-description">
                <strong>Project Description:</strong>
                <p>{project.description}</p>
            </div>

            <div className="project-detail-row">
                <div><strong>Deployed Link:</strong> <a href={project.deployed} target="_blank" rel="noopener noreferrer">{project.deployed}</a></div>
            </div>

            {project.futureEnhancement && project.futureEnhancement.trim() !== "" && (
                <div className="project-detail-row">
                    <div><strong>Future Enhancement:</strong></div>
                    <p>{project.futureEnhancement}</p>
                </div>
            )}

            {(project.twitter || project.instagram || project.linkedin || project.github) && (
                <div className="social-media-section">
                    <h3>Social Media Links</h3>
                    <div className="social-media-icons">
                        {project.twitter && (
                            <a href={project.twitter} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faTwitter} className="social-icon" />
                            </a>
                        )}
                        {project.instagram && (
                            <a href={project.instagram} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faInstagram} className="social-icon" />
                            </a>
                        )}
                        {project.linkedin && (
                            <a href={project.linkedin} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGithub} className="social-icon" />
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProjectDetail;
