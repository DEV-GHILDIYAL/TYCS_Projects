import { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import "./Profile.css";
import { toast, Slide } from "react-toastify";

const Profile = () => {
  const [profilePhoto, setProfilePhoto] = useState(
    "https://ichef.bbci.co.uk/images/ic/1200x675/p03c84wz.jpg"
  );
  const [profileData, setProfileData] = useState({
    name: "",
    rollNo: "",
    phoneNo: "",
    email: "",
    year: "",
    batch: "",
    department: "",
    projects: [],
  });
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACK_URL}/auth/get-profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies if needed
        });

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
              <h1>{profileData.name}</h1>
              <p className="profile-page-roll-no">Roll No: {profileData.rollNo}</p>
            </div>
          </header>

          <div className="profile-page-details">
          <div className="profile-page-detail-row">
              <label>Name:</label>
              <p>{profileData.name.toUpperCase()}</p>
            </div>
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

        {/* <div className="profile-page-right-column">
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
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
