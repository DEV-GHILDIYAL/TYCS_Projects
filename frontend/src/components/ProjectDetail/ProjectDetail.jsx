import React from 'react';
import './ProjectDetail.css';
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
                <h2 className="project-title">{project ? project.title : 'Add New Project'}</h2>
                {/* Email Link
                <p href={`mailto:${project.email}`} className="email-link">
                    {project.email}ghildiyaldev1325@gmail.com
                </p> */}
            </div>

            <div className="project-detail-row">
                <div><strong>Name:</strong> {project.name}</div>
                <div><strong>Roll Number:</strong> {project.rollno}</div>
                <div><strong>Category:</strong> {project.category}</div>
            </div>

            <div className="project-detail-row">
                <div><strong>Deployed Link:</strong> <a href={project.deployed} target="_blank" rel="noopener noreferrer">{project.deployed}</a></div>
            </div>
            
            <div className="project-detail-description">
                <strong>Project Description:</strong>
                <p>{project.description}</p>
            </div>

            {project.future && project.future.trim() !== "" && (
                <div className="project-detail-future">
                    <strong>Future Enhancement:</strong>
                    <p>{project.future}</p>
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
