import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa"; // Importing the camera icon from react-icons/fa
import "./Profile.css";
import Cookies from "js-cookie";
import { toast, Slide } from "react-toastify";

const Profile = () => {
  const [allstudents, setallstudents] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    batch: "",
    year: "",
    projectNumber: "",
    category: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const [profilePhoto, setProfilePhoto] = useState(
    "https://ichef.bbci.co.uk/images/ic/1200x675/p03c84wz.jpg"
  );
  const [profileData, setProfileData] = useState(null); // Dynamic profile data

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/admin/getstudent`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies if needed
        });

        const data = await response.json();
        if (response.ok) {
          setallstudents(data.data || []); // Assuming `data` contains `data` field with students array
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
  
    
  const filteredStudents = allstudents.filter((stud) => {
    return (
      (!filters.department || stud.department === filters.department) &&
      (!filters.batch || stud.batch === filters.batch) &&
      (!filters.year || stud.year === filters.year) &&
      (!filters.projectNumber ||
        stud.projectNumber === filters.projectNumber) &&
      (!filters.category || stud.category === filters.category)
    );
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/admin/getstudent`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include cookies if needed
        });

        const data = await response.json();
        if (response.ok) {
          setallstudents(data.data || []); // Assuming `data` contains `data` field with students array
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
              <h1>{filteredStudents.name}</h1>
              <p className="profile-page-roll-no">Roll No: {profileData.rollNo}</p>
            </div>
          </header>

          <div className="profile-page-details">
            <div className="profile-page-detail-row">
              <label>Phone:</label>
              <p>{filteredStudents.phoneNo}</p>
            </div>
            <div className="profile-page-detail-row">
              <label>Email:</label>
              <p>{filteredStudents.email}</p>
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
