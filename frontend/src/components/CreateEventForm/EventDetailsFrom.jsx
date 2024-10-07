import React, { useState, useEffect } from "react";
import "./EventDetailsForm.css";
import { toast } from "react-toastify";

const EventDetailsForm = ({
  editingProjectId,
  setEditingProjectId,
  initialData = {},
}) => {
  const [name, setName] = useState(initialData.name || "");
  const [rollNo, setRollNo] = useState(initialData.rollno || "");
  const [projectTitle, setProjectTitle] = useState(initialData.title || "");
  const [projectDescription, setProjectDescription] = useState(
    initialData.description || ""
  );
  const [projectCategory, setProjectCategory] = useState(
    initialData.category || ""
  );
  const [deployedLink, setDeployedLink] = useState(initialData.deployed || "");
  const [githubLink, setGithubLink] = useState(initialData.github || "");
  const [futureEnhancements, setFutureEnhancements] = useState(
    initialData.future || ""
  );
  const [twitterLink, setTwitterLink] = useState(initialData.twitter || "");
  const [instagramLink, setInstagramLink] = useState(
    initialData.instagram || ""
  );
  const [linkedinLink, setLinkedinLink] = useState(initialData.linkedin || "");
  const [progressColor, setProgressColor] = useState("red");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  // const [apkFile, setApkFile] = useState(null);

  const token = localStorage.getItem("token");
  // const handleApkChange = (e) => {
  //   setApkFile(e.target.files[0]);
  // };

  const resetForm = () => {
    setName("");
    setRollNo("");
    setProjectTitle("");
    setProjectDescription("");
    setProjectCategory("");
    setDeployedLink("");
    setGithubLink("");
    setFutureEnhancements("");
    setTwitterLink("");
    setInstagramLink("");
    setLinkedinLink("");

    setCompletionPercentage(0);
    setProgressColor("red");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert the name to uppercase
    const upperCaseName = name.toUpperCase();
    try {
      const url = editingProjectId
        ? `http://localhost:5500/${editingProjectId}`
        : "http://localhost:5500/";
      const method = editingProjectId ? "PUT" : "POST";
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: upperCaseName,
          rollno: rollNo,
          description: projectDescription,
          category: projectCategory,
          title: projectTitle,
          deployed: deployedLink,
          future: futureEnhancements,
          github: githubLink,
          twitter: twitterLink,
          linkedin: linkedinLink,
          instagram: instagramLink,
        }),
        credentials: "include",
      });
      const data = await response.json();
      console.log("Response Data:", data);

      if (response.ok) {
        toast.success(
          editingProjectId ? "Project updated!" : "Project added!",
          { autoClose: 1000 }
        );

        resetForm(); // Clear form after successful submission
        setEditingProjectId(null); // Reset edit mode
        // navigate("/")
      } else {
        toast.error(
          `Error ${editingProjectId ? "updating" : "saving"} project!`,
          { autoClose: 1000 }
        );
      }
    } catch (error) {
      console.error("Error occurred while saving project:", error);
      toast.error("Unable to save project!", { autoClose: 1000 });
    }
  };

  const calculateCompletionPercentage = () => {
    const totalFields = 11; // Total fields to track
    let completedFields = 0;

    // Count filled fields
    if (name) completedFields++;
    if (rollNo) completedFields++;
    if (projectTitle) completedFields++;
    if (projectDescription) completedFields++;
    if (projectCategory) completedFields++;

    // Check for deployed or apk link based on category
    if (projectCategory === "Mobile App Development" && deployedLink) {
      completedFields++;
    } else if (projectCategory !== "Mobile App Development" && deployedLink) {
      completedFields++;
    }

    if (githubLink) completedFields++;
    if (futureEnhancements) completedFields++;
    if (twitterLink) completedFields++;
    if (instagramLink) completedFields++;
    if (linkedinLink) completedFields++;

    const percentage = (completedFields / totalFields) * 100;
    setCompletionPercentage(percentage);

    const requiredFieldsFilled =
      name &&
      rollNo &&
      projectTitle &&
      projectDescription &&
      projectCategory &&
      ((projectCategory === "Mobile App Development" && deployedLink) ||
        (projectCategory !== "Mobile App Development" && deployedLink));

    setProgressColor(requiredFieldsFilled ? "#007bff" : "red");
  };

  useEffect(() => {
    calculateCompletionPercentage();
  }, [
    name,
    rollNo,
    projectTitle,
    projectDescription,
    projectCategory,
    deployedLink,
    githubLink,
    futureEnhancements,
    twitterLink,
    instagramLink,
    linkedinLink,
  ]);

  return (
    <form className="event-details-form" onSubmit={handleSubmit}>
      <h3>        {editingProjectId ? "Update Project" : "Add Project"}
      </h3>

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${completionPercentage}%`,
            backgroundColor: progressColor,
          }}
        />
      </div>
      <div className="progress-percentage">
        {completionPercentage.toFixed(0)}%
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>
            Name: <span className="required">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label>
            Roll No: <span className="required">*</span>
          </label>
          <input
            type="number"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Enter your roll number"
            required
          />
        </div>
        <div className="form-group">
          <label>
            Project Title: <span className="required">*</span>
          </label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Enter the project title"
            required
          />
        </div>
      </div>

      <div className="form-row full-width">
        <div className="form-group full-width">
          <label>
            Project Description: <span className="required">*</span>
          </label>
          <textarea
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            placeholder="Describe your project..."
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group half-width">
          <label>
            Project Category: <span className="required">*</span>
          </label>
          <select
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="Game Development">Game Development</option>
            <option value="Blockchain">Blockchain</option>
          </select>
        </div>
        <div className="form-group half-width">
          <label>
            Deployed Link: <span className="required">*</span>
          </label>
          <input
            type="url"
            value={deployedLink}
            onChange={(e) => setDeployedLink(e.target.value)}
            placeholder="Enter the deployed link"
            required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group full-width">
          <label>Future Enhancements:</label>
          <textarea
            value={futureEnhancements}
            onChange={(e) => setFutureEnhancements(e.target.value)}
            placeholder="Describe future enhancements (optional)"
          />
        </div>
      </div>

      <h4 className="social-media-title">Social Media Links</h4>
      <div className="social-media-links">
        <div className="form-group">
          <label>Twitter Link:</label>
          <input
            type="url"
            value={twitterLink}
            onChange={(e) => setTwitterLink(e.target.value)}
            placeholder="Enter Twitter link"
          />
        </div>
        <div className="form-group">
          <label>Instagram Link:</label>
          <input
            type="url"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            placeholder="Enter Instagram link"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn Link:</label>
          <input
            type="url"
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
            placeholder="Enter LinkedIn link"
          />
        </div>
        <div className="form-group">
          <label>Github Link:</label>
          <input
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="Enter GitHub link"
          />
        </div>
      </div>

      {/* Uncomment the below lines to enable APK file upload */}
      {/* <div className="form-group">
        <label>APK File:</label>
        <input
          type="file"
          accept=".apk"
          onChange={handleApkChange}
        />
      </div> */}

      <button type="submit" className="submit-button">
        {editingProjectId ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default EventDetailsForm;
