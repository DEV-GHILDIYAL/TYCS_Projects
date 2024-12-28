import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";  // Importing the camera icon from react-icons/fa
import "./Profile.css";

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://ichef.bbci.co.uk/images/ic/1200x675/p03c84wz.jpg"
  );

  const profileData = {
    username: "Dev Ghildiyal",
    rollNo: "CS421",
    phoneNo: "123-456-7890",
    year: "2024-2025",
    batch: "Batch 1",
    department: "Computer Science",
    email: "g22.dev.ghildiyal@gnkhalsa.edu.in",
    projects: {
      sem5: {
        title: "Library Management System",
        category: "Website Development",
        image: "https://media.istockphoto.com/id/1451316016/photo/lms-learning-management-system-for-lesson-and-online-education-course-application-study-e.jpg?s=2048x2048&w=is&k=20&c=JRMwex9Pjv1gtqvFYsYb80TXrggyIVh-grnmn6fQr-k=",
      },
      sem6: {
        title: "AI Chatbot",
        category: "App Development",
        image: "https://img.freepik.com/premium-vector/computer-online-chat-notices_441769-114.jpg?semt=ais_hybrid",
      },
    },
  };

  const handleEditDetails = () => {
    alert("Edit Details functionality coming soon!");
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-page-card">
        <div className="profile-page-left-column">
          <header className="profile-page-header">
            <div className="profile-page-photo-container">
              <img
                src={profilePhoto}
                alt="Profile"
                className="profile-page-photo"
              />
              <input
                type="file"
                id="profile-pic-upload"
                accept="image/*"
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
              />
              <label htmlFor="profile-pic-upload" className="profile-page-camera-icon">
                <FaCamera /> {/* Using the FaCamera icon from react-icons */}
              </label>
            </div>
            <div className="profile-page-header-text">
              <h1>{profileData.username}</h1>
              <p className="profile-page-roll-no">Roll No: {profileData.rollNo}</p>
            </div>
          </header>

          <div className="profile-page-details">
            <div className="profile-page-detail-row">
              <label>Phone:</label>
              <p>{profileData.phoneNo}</p>
            </div>
            <div className="profile-page-detail-row">
              <label>Email:</label>
              <p>{profileData.email}</p>
            </div>
            <div className="profile-page-detail-row">
              <label>Year:</label>
              <p>{profileData.year}</p>
            </div>
            <div className="profile-page-detail-row">
              <label>Batch:</label>
              <p>{profileData.batch}</p>
            </div>
            <div className="profile-page-detail-row">
              <label>Department:</label>
              <p>{profileData.department}</p>
            </div>
          </div>

          <div className="profile-page-edit-details-container">
            <button
              className="profile-page-button profile-page-button primary"
              onClick={handleEditDetails}
            >
              Edit Details
            </button>
          </div>
        </div>

        <div className="profile-page-right-column">
          <section className="profile-page-projects-section">
            <h2>Projects</h2>
            <div className="profile-page-projects">
              <div className="profile-page-project-card">
                <img
                  src={profileData.projects.sem5.image}
                  alt="Project Image"
                  className="profile-page-project-image"
                />
                <h3>{profileData.projects.sem5.title}</h3>
                <p className="profile-page-project-category">
                  Category: {profileData.projects.sem5.category}
                </p>
                <p>Semester: 5</p>
              </div>
              <div className="profile-page-project-card">
                <img
                  src={profileData.projects.sem6.image}
                  alt="Project Image"
                  className="profile-page-project-image"
                />
                <h3>{profileData.projects.sem6.title}</h3>
                <p className="profile-page-project-category">
                  Category: {profileData.projects.sem6.category}
                </p>
                <p>Semester: 6</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
