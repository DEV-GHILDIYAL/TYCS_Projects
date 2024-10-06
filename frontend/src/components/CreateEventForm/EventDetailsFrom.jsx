import React, { useState, useEffect } from 'react';
import './EventDetailsForm.css';

const EventDetailsForm = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [apkFile, setApkFile] = useState(null);
  const [deployedLink, setDeployedLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [futureEnhancements, setFutureEnhancements] = useState('');
  const [completionPercentage, setCompletionPercentage] = useState(0);
  const [progressColor, setProgressColor] = useState('red');

  const [youtubeLink, setYoutubeLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');

  const handleApkChange = (e) => {
    setApkFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      deployedLink: projectCategory === 'Mobile App Development' ? apkFile : deployedLink,
      githubLink,
      futureEnhancements,
      twitterLink,
      instagramLink,
      linkedinLink,
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
      setName('');
      setRollNo('');
      setProjectTitle('');
      setProjectDescription('');
      setProjectCategory('');
      setApkFile(null);
      setDeployedLink('');
      setGithubLink('');
      setFutureEnhancements('');
      setTwitterLink('');
      setInstagramLink('');
      setLinkedinLink('');
      setCompletionPercentage(0);
      setProgressColor('red');
    } else {
      console.error('Failed to create the project');
    }
  };

  const calculateCompletionPercentage = () => {
    const totalFields = 11;
    let completedFields = 0;

    if (name) completedFields++;
    if (rollNo) completedFields++;
    if (projectTitle) completedFields++;
    if (projectDescription) completedFields++;
    if (projectCategory) completedFields++;
    
    if (projectCategory === 'Mobile App Development' && apkFile) {
      completedFields++;
    } else if (projectCategory !== 'Mobile App Development' && deployedLink) {
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
      githubLink &&
      ((projectCategory === 'Mobile App Development' && apkFile) || 
      (projectCategory !== 'Mobile App Development' && deployedLink));

    setProgressColor(requiredFieldsFilled ? '#007bff' : 'red');
  };

  useEffect(() => {
    calculateCompletionPercentage();
  }, [name, rollNo, projectTitle, projectDescription, projectCategory, apkFile, deployedLink, githubLink, futureEnhancements, twitterLink, instagramLink, linkedinLink]);

  return (
    <form className="event-details-form" onSubmit={handleSubmit}>
  <h3>Create Project</h3>

  <div className="progress-bar">
    <div className="progress" style={{ width: `${completionPercentage}%`, backgroundColor: progressColor }} />
  </div>
  <div className="progress-percentage">{completionPercentage.toFixed(0)}%</div>

  <div className="form-row">
    <div className="form-group">
      <label>Name: <span className="required">*</span></label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name" 
        required 
      />
    </div>
    <div className="form-group">
      <label>Roll No: <span className="required">*</span></label>
      <input 
        type="number" 
        value={rollNo} 
        onChange={(e) => setRollNo(e.target.value)} 
        placeholder="Enter your roll number" 
        required 
      />
    </div>
    <div className="form-group">
      <label>Project Title: <span className="required">*</span></label>
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
      <label>Project Description: <span className="required">*</span></label>
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
    <div className="form-group half-width">
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
            placeholder="Enter the deployed link" 
            required 
          />
        </>
      )}
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
      <label>GitHub Link: <span className="required">*</span></label>
      <input 
        type="url" 
        value={githubLink} 
        onChange={(e) => setGithubLink(e.target.value)} 
        placeholder="Enter GitHub link (optional)" 
      />
    </div>
  </div>

  <button type="submit" className="submit-button">Submit</button>
</form>

  );
};

export default EventDetailsForm;
