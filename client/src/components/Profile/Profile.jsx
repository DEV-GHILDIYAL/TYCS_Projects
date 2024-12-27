import React from "react";
import "./Profile.css";

const Profile = () => {
  // Dummy profile data
  const profileData = {
    username: "John Doe",
    rollNo: "CS202045",
    profilePhoto: "https://via.placeholder.com/150", // Replace with a real image URL
    phoneNo: "123-456-7890",
    batch: "2022-2020",
    department: "Computer Science",
    email: "john.doe@example.com",
    projects: {
      sem5: {
        title: "Library Management System",
        category: "Website Development",
      },
      sem6: {
        title: "AI Chatbot",
        category: "App Development",
      },
    },
  };

  const handleEditDetails = () => {
    alert("Edit Details functionality coming soon!");
    // Integrate form or modal logic here for editing profile details
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <header className="profile-header">
          <img
            src={profileData.profilePhoto}
            alt="Profile"
            className="profile-photo"
          />
          <h1>{profileData.username}</h1>
          <p className="roll-no">Roll No: {profileData.rollNo}</p>
        </header>

        <div className="profile-details">
          <div className="detail-item">
            <label>Phone:</label>
            <input
              type="text"
              value={profileData.phoneNo}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="detail-item">
            <label>Batch:</label>
            <input
              type="text"
              value={profileData.batch}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="detail-item">
            <label>Department:</label>
            <input
              type="text"
              value={profileData.department}
              readOnly
              className="readonly-input"
            />
          </div>
          <div className="detail-item">
            <label>Email:</label>
            <input
              type="email"
              value={profileData.email}
              readOnly
              className="readonly-input"
            />
          </div>
        </div>

        <section className="projects-section">
          <h2>Projects</h2>
          <div className="projects">
            <div className="project-card">
              <h3>Semester 5</h3>
              <p className="profile-project-title">{profileData.projects.sem5.title}</p>
              <p className="project-category">
                Category: {profileData.projects.sem5.category}
              </p>
            </div>
            <div className="project-card">
              <h3>Semester 6</h3>
              <p className="profile-project-title">{profileData.projects.sem6.title}</p>
              <p className="project-category">
                Category: {profileData.projects.sem6.category}
              </p>
            </div>
          </div>
        </section>

        {/* Edit Details Button */}
        <div className="edit-details-container">
          <button className="button primary" onClick={handleEditDetails}>
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
