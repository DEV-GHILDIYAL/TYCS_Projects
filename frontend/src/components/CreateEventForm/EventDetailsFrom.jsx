import React, { useState, useEffect } from "react";
import "./EventDetailsForm.css";
import { toast } from "react-toastify";


const EventDetailsForm = () => {
  const [name, setName] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [apkFile, setApkFile] = useState(null);
  const [deployedLink, setDeployedLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [futureEnhancements, setFutureEnhancements] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [progressColor, setProgressColor] = useState("red");
  const [twitterLink, setTwitterLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [linkedinLink, setLinkedinLink] = useState("");
  
  const token = localStorage.getItem("token");

  // const handleApkChange = (e) => {
  //   setApkFile(e.target.files[0]);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
     // Convert the name to uppercase
     const upperCaseName = name.toUpperCase();

    // if (projectCategory === 'Mobile App Development' && !apkFile) {
    //   alert('Please upload an APK file for Mobile App Development.');
    //   return;
    // }

    // if (projectCategory !== 'Mobile App Development' && !deployedLink) {
    //   alert('Please enter a deployed link for this project.');
    //   return;
    // }

      try {
        const response = await fetch(`http://localhost:5500/`, {
          method:"POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: upperCaseName,
            rollno: rollNo,
            description: projectDescription,
            category:projectCategory ,
            title:projectTitle,
            deployed:deployedLink ,
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
          toast.success("Project has been added!",{autoClose: 1000,});
          setName("");
      setRollNo("");
      setProjectTitle("");
      setProjectDescription("");
      setProjectCategory("");
      setApkFile(null);
      setDeployedLink("");
      setGithubLink("");
      setFutureEnhancements("");
      setTwitterLink("");
      setInstagramLink("");
      setLinkedinLink("");
      setCompletionPercentage(0);
      setProgressColor("red");
        } else {
          // Show error message with response data
          toast.error(`Error saving project!`,{autoClose: 1000,});
        }
      } catch (error) {
        console.error("Error occurred while saving project:", error);
        toast.error("Unable to save project!", {autoClose: 1000,});}
    };

    // const projectDetails = {
    //   name,
    //   rollNo,
    //   projectTitle,
    //   projectDescription,
    //   projectCategory,
    //   // deployedLink: projectCategory === 'Mobile App Development' ? apkFile : deployedLink,
    //   deployedLink,
    //   githubLink,
    //   futureEnhancements,
    //   twitterLink,
    //   instagramLink,
    //   linkedinLink,
    // };

    // const formData = new FormData();
    // for (const key in projectDetails) {
    //   if (key === 'apkFile' && apkFile) {
    //     formData.append('apkFile', apkFile);
    //   } else {
    //     formData.append(key, projectDetails[key]);
    //   }
    // }

  // const handleEdit = (customer) => {
  //   setEditingCustomerId(customer._id);
  //   setName(customer.name);
  //   setPhone(customer.contactInfo.phone);
  //   setEmail(customer.contactInfo.email);
  //   setUpi(customer.contactInfo.upi);
  //   setTotalAmount(customer.totalAmount);
  //   setTotalPaid(customer.totalPaid);
  //   setTotalDue(customer.totalDue);
  // }

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`http://localhost:5500/${id}`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: `Bearer ${token}`,
  //       },
  //       credentials: "include",
  //     });
  //     if (response.ok) {
  //       setProjects((prevCust) =>
  //         prevCust.filter((project) => project._id !== id)
  //       );
  //       toast.success("project deleted succesfully!", { autoClose: 1000 });
  //     } else {
  //       toast.error("Error deleting project!", { autoClose: 1000 });
  //     }
  //   } catch (error) {
  //     toast.error("Unable to delete project!", { autoClose: 1000 });
  //   }
  // };

  const calculateCompletionPercentage = () => {
    const totalFields = 11;
    let completedFields = 0;

    if (name) completedFields++;
    if (rollNo) completedFields++;
    if (projectTitle) completedFields++;
    if (projectDescription) completedFields++;
    if (projectCategory) completedFields++;

    if (projectCategory === "Mobile App Development" && apkFile) {
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
      // githubLink &&
      ((projectCategory === "Mobile App Development" && apkFile) ||
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
    apkFile,
    deployedLink,
    githubLink,
    futureEnhancements,
    twitterLink,
    instagramLink,
    linkedinLink,
  ]);

  return (
    <form className="event-details-form" onSubmit={handleSubmit}>
      <h3>Create Project</h3>

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
          {/* {projectCategory === "Mobile App Development" ? ( 
          //   <>
          //     <label>
          //       APK File: <span className="required">*</span>
          //     </label>
          //     <input
          //       type="file"
          //       accept=".apk"
          //       // onChange={handleApkChange}
          //       required
          //     />
          //   </>
          // ) : (*/}
            {/* <> */}
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
            {/* </> */}
          {/* )} */}
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
            placeholder="Enter Twitter link (optional)"
          />
        </div>
        <div className="form-group">
          <label>Instagram Link:</label>
          <input
            type="url"
            value={instagramLink}
            onChange={(e) => setInstagramLink(e.target.value)}
            placeholder="Enter Instagram link (optional)"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn Link:</label>
          <input
            type="url"
            value={linkedinLink}
            onChange={(e) => setLinkedinLink(e.target.value)}
            placeholder="Enter LinkedIn link (optional)"
          />
        </div>
        <div className="form-group">
          <label>
            GitHub Link:
          </label>
          <input
            type="url"
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
            placeholder="Enter GitHub link (optional)"
          />
        </div>
      </div>

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default EventDetailsForm;
