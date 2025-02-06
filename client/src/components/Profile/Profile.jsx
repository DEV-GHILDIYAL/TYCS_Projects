import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./Profile.css";
import { toast, Slide } from "react-toastify";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://ichef.bbci.co.uk/images/ic/1200x675/p03c84wz.jpg"
  );
  const [selectedFile, setSelectedFile] = useState();
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
    userId: "",
    projects: [],
  });

  const projectData = profileData?.projects || [];
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
        console.log(data);
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
  console.log(profileData.projects);

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
      const formData = new FormData();
  formData.append("profilePicture", selectedFile);
      console.log(updatedProfileData);

      const response1 = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/upload`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
  
      const data1 = await response1.json();
      console.log("Server Response:", data1);

      const response = await fetch(
        `${import.meta.env.VITE_BACK_URL}/auth/update-profile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProfileData),
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        toast.success("Profile updated successfully!", {
          position: "top-right",
          theme: "light",
          transition: Slide,
          autoClose: 1000,
        });
        // window.location.reload();
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
console.log(`url ${import.meta.env.VITE_BACK_URL}/${profileData.profilepic}`)
  return (
    <div className="profile-page-container">
      <div className="profile-page-card">
        <div className="profile-page-left-column">
          <header className="profile-page-header">
            <div className="profile-page-photo-container">
              <img
                src={`${import.meta.env.VITE_BACK_URL}/${profileData.profilepic}`}
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
          {/* <div className="profile-page-projects">
            {projectData.map((project, index) => (
              <div className="profile-page-project-card" key={index}>
                <img
                  src="https://www.baker.edu/wp-content/uploads/game-developer-degree.jpg"
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
                      Project No: {project.project}
                    </span>
                  </div>
                  <div className="profile-project-row">
                    <span className="profile-page-project-category">
                      Description: {project.description}
                    </span>
                    <span className="profile-page-project-category">
                      isCompleted: {project.iscompleted}
                    </span>
                  </div>
                  <div className="profile-project-row">
                    <span className="profile-page-project-category">
                      Github: {project.github}
                    </span>
                    <span className="profile-page-project-category">
                       Deployed: {project.deployed}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div> */}

          <div className="profile-page-projects">
            {projectData.slice(0, 2).map((project, index) => (
              <div className="profile-page-project-card" key={index}>
                <img
                  src="https://www.baker.edu/wp-content/uploads/game-developer-degree.jpg"
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
                      Project No: {project.project}
                    </span>
                  </div>
                  <div className="profile-project-row">
                    <span className="profile-page-project-category">
                      Deployed:
                      {project.deployed ? (
                        <a
                          href={project.deployed}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt />
                        </a>
                      ) : (
                        " NA"
                      )}
                    </span>
                    <span className="profile-page-project-category">
                      isCompleted: {project.iscompleted ? "Yes" : "No"}
                    </span>
                  </div>
                  {/* <div className="profile-project-row">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <FaGithub />
                      </a>
                    )}
                    {project.linkedin && (
                      <a
                        href={project.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {project.instagram && (
                      <a
                        href={project.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {project.twitter && (
                      <a
                        href={project.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-icon"
                      >
                        <FaTwitter />
                      </a>
                    )}
                  </div> */}
                  <div className="profile-project-row social-links">
                    <a
                      href={project.github || "#"}
                      target={project.github ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className={!project.github ? "disabled-link" : ""}
                    >
                      <FaGithub />
                    </a>
                    <a
                      href={project.linkedin || "#"}
                      target={project.linkedin ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className={!project.linkedin ? "disabled-link" : ""}
                    >
                      <FaLinkedin />
                    </a>
                    <a
                      href={project.instagram || "#"}
                      target={project.instagram ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className={!project.instagram ? "disabled-link" : ""}
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={project.twitter || "#"}
                      target={project.twitter ? "_blank" : ""}
                      rel="noopener noreferrer"
                      className={!project.twitter ? "disabled-link" : ""}
                    >
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            ))}

            {/* Render "No Project" cards if less than two projects exist */}
            {projectData.length < 2 &&
              Array.from({ length: 2 - projectData.length }).map((_, index) => (
                <div
                  className="profile-page-project-card no-project-card"
                  key={`no-project-${index}`}
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/75/No_image_available.png"
                    alt="No Project"
                    className="profile-page-project-image"
                  />
                  <h2>No Project</h2>
                  <p>No project is available yet.</p>
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
            <form
              action={`${import.meta.env.VITE_BACK_URL}/upload`}
              method="POST"
              encType="multipart/form-data"
            >
              {/* Profile Image Upload with Preview */}
              <div className="popup-form-row">
                <label>Profile Image:</label>
                <div className="profile-image-preview">
                  <img
                    src={profileData.profilepic || "default-image.jpg"}
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
                      setSelectedFile(file); // Store the file in state
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onloadend = () => {
                        setProfileData((prevData) => ({
                          ...prevData,
                          profilepic: reader.result, // For preview
                        }));
                      };
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
                    handSaveEditDetails();
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
