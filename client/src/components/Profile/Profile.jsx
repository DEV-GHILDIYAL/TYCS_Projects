import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./Profile.css";
import { toast, Slide } from "react-toastify";
import "./Profile.css";
const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://ichef.bbci.co.uk/images/ic/1200x675/p03c84wz.jpg"
  );
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility
  const [profileData, setProfileData] = useState({
    name: "",
    rollNo: "",
    phoneNo: "",
    email: "",
    year: "",
    batch: "",
    department: "",
    projects: [
      {
        title: "Project 1",
        image: "https://via.placeholder.com/150",
        description: "This is the description for Project 1.",
        category: "Category 1",
      },
      {
        title: "Project 2",
        image: "https://via.placeholder.com/150",
        description: "This is the description for Project 2.",
        category: "Category 2",
      },
    ],
  });

  const projectData = [
    {
      image: "https://img.freepik.com/free-vector/gradient-stock-market-concept_23-2149166910.jpg",
      title: "Project 1",
      rollNo: "421",
      department: "CS",
      year: "2024-2025",
      batch: "Batch 1",
      projectNo: "Project 1",
      description: "This is a description of project 1.",
      category: "Web Development",
    },
    {
      image: "https://www.baker.edu/wp-content/uploads/game-developer-degree.jpg",
      title: "Project 2",
      rollNo: "421",
      department: "CS",
      year: "2024-2025",
      batch: "Batch 1",
      projectNo: "Project 2",
      description: "This is a description of project 2.",
      category: "Mobile App",
    },
  ];

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACK_URL}/auth/get-profile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const data = await response.json();
        if (response.ok) {
          setProfileData(data);
          toast.success("Data fetched!", {
            position: "top-right",
            theme: "light",
            transition: Slide,
            autoClose: 1000,
          });
        } else {
          console.error("Server error:", data.message);
          toast.error("Student data is not fetched!", {
            position: "top-right",
            theme: "dark",
            transition: Slide,
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.error("Failed to fetch students:", error);
        toast.error("Failed to fetch students. Please try again!", {
          position: "top-right",
          theme: "dark",
          transition: Slide,
          autoClose: 1000,
        });
      }
    };

    fetchStudents();
  }, []);

  const handleEditDetails = () => {
    setIsPopupVisible(true); // Show the popup
  };

  const handleClosePopup = () => {
    setIsPopupVisible(false); // Hide the popup
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

  if (!profileData) {
    return (
      <div className="profile-loader">
        <p>Loading profile data...</p>
      </div>
    );
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
            </div>
            <div className="profile-page-header-text">
              <h1>{profileData.name.toLocaleLowerCase()}</h1>
              <p className="profile-page-roll-no">
                Roll No: {profileData.rollNo}
              </p>
            </div>
          </header>

          <div className="profile-page-details">
            <div className="profile-page-detail-row">
              <label>Name:</label>
              <p>{profileData.name.toUpperCase()}</p>
            </div>
            {profileData.phoneNo &&
              profileData.phoneNo !== "0" &&
              profileData.phoneNo !== 0 && (
                <div className="profile-page-detail-row">
                  <label>Phone:</label>
                  <p>{profileData.phoneNo}</p>
                </div>
              )}

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
          <div className="profile-page-projects">
            {projectData.map((project, index) => (
              <div className="profile-page-project-card" key={index}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="profile-page-project-image"
                />
                <h2>{project.title}</h2>
                <div className="profile-project-data">
                  <div className="profile-project-row">
                    <span className="profile-page-project-category">
                      Category: {project.category}
                    </span>
                    <span className="profile-page-project-category">
                      Roll No: {project.rollNo}
                    </span>
                  </div>
                  <div className="profile-project-row">
                    <span className="profile-page-project-category">
                      Department: {project.department}
                    </span>
                    <span className="profile-page-project-category">
                      Year: {project.year}
                    </span>
                  </div>
                  <div className="profile-project-row">
                    <span className="profile-page-project-category">
                      Batch: {project.batch}
                    </span>
                    <span className="profile-page-project-category">
                      Project No: {project.projectNo}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Section */}
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-content">
            <h2>Edit Details</h2>
            <form>
              {/* Profile Image Upload with Preview */}
              <div className="popup-form-row">
                <label>Profile Image:</label>
                <div className="profile-image-preview">
                  <img
                    src={profilePhoto}
                    alt="Preview"
                    className="profile-preview-image"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setProfilePhoto(reader.result); // Update the preview image dynamically
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>

              {/* Name */}
              <div className="popup-form-row">
                <label>Name:</label>
                <input type="text" defaultValue={profileData.name} />
              </div>

              {/* Email */}
              <div className="popup-form-row">
                <label>Email:</label>
                <input type="email" defaultValue={profileData.email} />
              </div>

              {/* Phone Number */}
              <div className="popup-form-row">
                <label>Phone Number:</label>
                <input type="tel" defaultValue={profileData.phoneNo} />
              </div>

              {/* Year */}
              <div className="popup-form-row">
                <label>Year:</label>
                <input type="text" defaultValue={profileData.year} />
              </div>

              {/* Batch */}
              <div className="popup-form-row">
                <label>Batch:</label>
                <input type="text" defaultValue={profileData.batch} />
              </div>

              {/* Department */}
              <div className="popup-form-row">
                <label>Department:</label>
                <input type="text" defaultValue={profileData.department} />
              </div>

              {/* Buttons */}
              <div className="popup-buttons">
                <button
                  type="button"
                  className="save-button"
                  onClick={() => {
                    alert("Details saved successfully!"); // Replace with save logic
                    handleClosePopup();
                  }}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
