import React, { useState } from 'react';
import './EventDetailsForm.css';

const EventDetailsForm = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [apkFile, setApkFile] = useState(null); // For APK file upload
  const [deployedLink, setDeployedLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [futureEnhancements, setFutureEnhancements] = useState(''); // For future enhancements

  const handleApkChange = (e) => {
    setApkFile(e.target.files[0]); // Handling only one APK file upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if either APK file or deployed link is provided based on category
    if (projectCategory === 'Mobile App Development' && !apkFile) {
      alert('Please upload an APK file for Mobile App Development.');
      return;
    }

    if (projectCategory !== 'Mobile App Development' && !deployedLink) {
      alert('Please enter a deployed link for this project.');
      return;
    }

    const projectDetails = {
      name,
      rollNo,
      projectTitle,
      projectDescription,
      projectCategory,
      deployedLink: projectCategory === 'Mobile App Development' ? apkFile : deployedLink, // APK or deployed link
      githubLink,
      futureEnhancements,
    };

    const formData = new FormData();
    for (const key in projectDetails) {
      if (key === 'apkFile' && apkFile) {
        formData.append('apkFile', apkFile);
      } else {
        formData.append(key, projectDetails[key]);
      }
    }

    const response = await fetch('http://localhost:5050/api/projects', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    if (response.ok) {
      console.log('Project created successfully');
      // Reset form fields
      setName('');
      setRollNo('');
      setProjectTitle('');
      setProjectDescription('');
      setProjectCategory('');
      setApkFile(null);
      setDeployedLink('');
      setGithubLink('');
      setFutureEnhancements('');
    } else {
      console.error('Failed to create the project');
    }
  };

  return (
    <form className="event-details-form" onSubmit={handleSubmit}>
      <h3>Create Project</h3>

      <div className="form-row">
        <div className="form-group">
          <label>Name: <span className="required">*</span></label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" // Added placeholder
            required 
          />
        </div>
        <div className="form-group">
          <label>Roll No: <span className="required">*</span></label>
          <input 
            type="number" 
            value={rollNo} 
            onChange={(e) => setRollNo(e.target.value)} 
            placeholder="Enter your roll number" // Added placeholder
            required 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Project Title: <span className="required">*</span></label>
          <input 
            type="text" 
            value={projectTitle} 
            onChange={(e) => setProjectTitle(e.target.value)} 
            placeholder="Enter the project title" // Added placeholder
            required 
          />
        </div>
        <div className="form-group">
          <label>Project Description: <span className="required">*</span></label>
          <textarea 
            value={projectDescription} 
            onChange={(e) => setProjectDescription(e.target.value)} 
            placeholder="Describe your project..." // Added placeholder
            required 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Project Category: <span className="required">*</span></label>
          <select 
            value={projectCategory} 
            onChange={(e) => setProjectCategory(e.target.value)} 
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Web Development">Web Development</option>
            <option value="Mobile App Development">Mobile App Development</option>
            <option value="Machine Learning">Machine Learning</option>
            <option value="Data Science">Data Science</option>
            <option value="Game Development">Game Development</option>
            <option value="Blockchain">Blockchain</option>
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          {projectCategory === 'Mobile App Development' ? (
            <>
              <label>APK File: <span className="required">*</span></label>
              <input 
                type="file" 
                accept=".apk" 
                onChange={handleApkChange} 
                required 
              />
            </>
          ) : (
            <>
              <label>Deployed Link: <span className="required">*</span></label>
              <input 
                type="url" 
                value={deployedLink} 
                onChange={(e) => setDeployedLink(e.target.value)} 
                placeholder="Enter the deployed link" // Added placeholder
                required // Set this as required when not uploading APK
              />
            </>
          )}
        </div>
        <div className="form-group">
          <label>GitHub Link: <span className="optional-text"> (optional)</span></label>
          <input 
            type="url" 
            value={githubLink} 
            onChange={(e) => setGithubLink(e.target.value)} 
            placeholder="Enter the GitHub link" // Added placeholder
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Future Enhancements: <span className="optional-text"> (optional)</span></label>
          <textarea 
            value={futureEnhancements} 
            onChange={(e) => setFutureEnhancements(e.target.value)} 
            placeholder="Describe any future enhancements you plan for this project..." // Added placeholder
          />
        </div>
      </div>

      <button type="submit">Submit Project</button>
    </form>
  );
};

export default EventDetailsForm;
