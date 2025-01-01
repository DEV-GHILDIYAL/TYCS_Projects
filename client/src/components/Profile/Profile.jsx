import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa"; // Importing the camera icon from react-icons/fa
import "./Profile.css";
import Cookies from "js-cookie";

const Profile = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status
  const [profilePhoto, setProfilePhoto] = useState(
    "https://ichef.bbci.co.uk/images/ic/1200x675/p03c84wz.jpg"
  );
  const [profileData, setProfileData] = useState(null); // Dynamic profile data

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get("userRole"); // Get the token from cookies
        console.log("User token from cookie:", token);
  
        if (token) {
          setIsLoggedIn(true);
          await fetchUserData(token); // Fetch user data if token exists
        } else {
          console.warn("No token found in cookies");
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setIsLoggedIn(false);
      }
    };
  
    const fetchUserData = async (token) => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/get-profile`, { // Replace with your API endpoint
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token for authentication
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched user data:", data);
          setProfileData(data); // Update profile data
        } else if (response.status === 401) {
          console.log(token);
          console.error("Unauthorized. Token might be invalid or expired.");
          setIsLoggedIn(false);
        } else {
          console.error("Failed to fetch user data", response.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    checkAuth();
  }, []);
  

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

  if (!isLoggedIn) {
    return <p>Please log in to view your profile.</p>;
  }

  if (!profileData) {
    return <p>Loading profile data...</p>;
  }

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
              {profileData.projects.map((project, index) => (
                <div key={index} className="profile-page-project-card">
                  <img
                    src={project.image}
                    alt={`Project ${project.title}`}
                    className="profile-page-project-image"
                  />
                  <h3>{project.title}</h3>
                  <p className="profile-page-project-category">
                    Category: {project.category}
                  </p>
                  <p>Semester: {project.semester}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
