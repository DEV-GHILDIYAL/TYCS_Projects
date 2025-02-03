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
    profilepic: "",
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
        // console.log(data);
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


  if (!profileData) {
    return (
      <div className="profile-loader">
        <p>Loading profile data...</p>
      </div>
    );
  }

  const handSaveEditDetails = async () => {
    try {
      const updatedProfileData = {
        name: document.querySelector('input[type="text"]').value,
        phoneNo: document.querySelector('input[type="tel"]').value,
      };
      console.log(updatedProfileData);
  
      const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/update-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProfileData),
        credentials: "include",
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          theme: "light",
          transition: Slide,
          autoClose: 1000,
        });
      } else {
        toast.error("Error updating profile: " + data.message, {
          position: "top-right",
          theme: "light",
          transition: Slide,
          autoClose: 1000,
        });
        
        
      }
    } catch (error) {
      console.error("Error saving profile details:", error);
      // alert("An error occurred while saving your profile.");
      toast.error("An error occurred while saving your profile.", {
        position: "top-right",
        theme: "light",
        transition: Slide,
        autoClose: 1000,
      });
    }
  };
  

  return ( 
    <div className="profile-page-container">
      <div className="profile-page-card">
        <div className="profile-page-left-column">
          <header className="profile-page-header">
            <div className="profile-page-photo-container">
              <img
                src={profileData.profilepic}
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
            <form action={`${import.meta.env.VITE_BACK_URL}/upload`} method="POST" encType="multipart/form-data">
              {/* Profile Image Upload with Preview */}
              <div className="popup-form-row">
                <label>Profile Image:</label>
                <div className="profile-image-preview">
                  <img
                    src={profileData.profilepic}
                    alt="Preview"
                    className="profile-preview-image"
                  />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  name="profilePicture"
                  onChange={(event) => {
                    const file = event.target.files[0];
                    if (file) {
                      const reader = new FileReader();
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

              {/* Phone Number */}
              <div className="popup-form-row">
                <label>Phone Number:</label>
                <input type="tel" defaultValue={profileData.phoneNo} />
              </div>

              {/* Buttons */}
              <div className="popup-buttons">
                <button
                  type="submit"
                  className="save-button"
                  onClick={() => {
                    handleClosePopup();
                    handSaveEditDetails()
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
