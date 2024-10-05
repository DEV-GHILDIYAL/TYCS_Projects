import React, { useState } from 'react';
import './EventDetailsForm.css';

const EventDetailsForm = () => {
  const [name, setName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [projectCategory, setProjectCategory] = useState('');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [deployedLink, setDeployedLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one image is selected
    if (images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    const projectDetails = {
      name,
      rollNo,
      projectTitle,
      projectDescription,
      projectCategory,
      tags,
      images,
      deployedLink,
      githubLink,
    };

    const response = await fetch('http://localhost:5050/api/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectDetails),
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
      setTags('');
      setImages([]);
      setDeployedLink('');
      setGithubLink('');
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
            required 
          />
        </div>
        <div className="form-group">
          <label>Roll No: <span className="required">*</span></label>
          <input 
            type="number" 
            value={rollNo} 
            onChange={(e) => setRollNo(e.target.value)} 
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
            required 
          />
        </div>
        <div className="form-group">
          <label>Project Description: <span className="required">*</span></label>
          <textarea 
            value={projectDescription} 
            onChange={(e) => setProjectDescription(e.target.value)} 
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
        <div className="form-group">
          <label>Tags:</label>
          <input 
            type="text" 
            value={tags} 
            onChange={(e) => setTags(e.target.value)} 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Images: <span className="required">*</span></label>
          <input 
            type="file" 
            accept="image/*" 
            multiple 
            onChange={handleImageChange} 
            required // Marked as required
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Deployed Link: <span className="required">*</span></label>
          <input 
            type="url" 
            value={deployedLink} 
            onChange={(e) => setDeployedLink(e.target.value)} 
            required // Marked as required
          />
        </div>
        <div className="form-group">
          <label>GitHub Link: <span className="required">*</span></label>
          <input 
            type="url" 
            value={githubLink} 
            onChange={(e) => setGithubLink(e.target.value)} 
            required // Marked as required
          />
        </div>
      </div>

      <button type="submit">Submit Project</button>
    </form>
  );
};

export default EventDetailsForm;
