// ProjectDetail.jsx
import React from 'react';
import './ProjectDetail.css';

// Import social media icons
import twitterIcon from '../../assets/images/twitter_icon.png';
import instagramIcon from '../../assets/images/instagram-icon.png';
import linkedinIcon from '../../assets/images/linkedin-icon.jpg';
import githubIcon from '../../assets/images/github-icon.png';

const ProjectDetail = ({ project, onBack }) => { // Accept onBack prop
    return (
        <div className="project-detail-container">
            <button onClick={onBack} className="back-button">Back</button> {/* Back button */}
            <h2>{project.title}</h2>

            <div className="project-detail-row">
                <div><strong>Name:</strong> {project.name}</div>
                <div><strong>Roll Number:</strong> {project.rollNumber}</div>
                <div><strong>Category:</strong> {project.category}</div>
            </div>

            <div className="project-detail-description">
                <strong>Project Description:</strong>
                <p>{project.description}</p>
            </div>

            <div className="project-detail-row">
                <div><strong>Deployed Link:</strong> <a href={project.deployedLink} target="_blank" rel="noopener noreferrer">{project.deployedLink}</a></div>
            </div>

            <div className="project-detail-row">
                <div><strong>Future Enhancement:</strong></div>
                <p>{project.futureEnhancement}</p>
            </div>

            <div className="social-media-section">
                <h3>Social Media Links</h3>
                <div className="social-media-icons">
                    {project.twitterLink && (
                        <a href={project.twitterLink} target="_blank" rel="noopener noreferrer">
                            <img src={twitterIcon} alt="Twitter" />
                        </a>
                    )}
                    {project.instagramLink && (
                        <a href={project.instagramLink} target="_blank" rel="noopener noreferrer">
                            <img src={instagramIcon} alt="Instagram" />
                        </a>
                    )}
                    {project.linkedinLink && (
                        <a href={project.linkedinLink} target="_blank" rel="noopener noreferrer">
                            <img src={linkedinIcon} alt="LinkedIn" />
                        </a>
                    )}
                    {project.githubLink && (
                        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                            <img src={githubIcon} alt="GitHub" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectDetail;
