import React, { useState } from 'react';
import './EventDetailsForm.css';

const EventDetailsForm = () => {
  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [ngoName, setNgoName] = useState('');
  const [importance, setImportance] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [requirements, setRequirements] = useState('');
  const [expectedAttendance, setExpectedAttendance] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [donationLink, setDonationLink] = useState('');
  const [costs, setCosts] = useState('');
  const [notes, setNotes] = useState('');
  const [event, setEvent] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleImageCancel = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const eventDetails = {
      eventName, description, location, date, time, duration, category, 
      organizer, ngoName, importance, status, image, requirements, 
      expectedAttendance, registrationLink, donationLink, costs, notes
    };
    
    const response = await fetch('http://localhost:5050/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventDetails),
      credentials: 'include',
    });

    if (response.ok) {
      setEvent(eventDetails);
      // Reset form fields
      setEventName('');
      setDescription('');
      setLocation('');
      setDate('');
      setTime('');
      setDuration('');
      setCategory('');
      setOrganizer('');
      setNgoName('');
      setImportance('');
      setStatus('');
      setImage(null);
      setImagePreview(null);
      setRequirements('');
      setExpectedAttendance('');
      setRegistrationLink('');
      setDonationLink('');
      setCosts('');
      setNotes('');
    } else {
      console.error('Failed to create the event');
    }
  };

  return (
    <form className="event-details-form" onSubmit={handleSubmit}>
      <h3>Create NGO Event</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Event Name: <span className="required">*</span></label>
          <input 
            type="text" 
            value={eventName} 
            onChange={(e) => setEventName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Description: <span className="required">*</span></label>
          <textarea 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Location: <span className="required">*</span></label>
          <input 
            type="text" 
            value={location} 
            onChange={(e) => setLocation(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Date: <span className="required">*</span></label>
          <input 
            type="date" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Time: <span className="required">*</span></label>
          <input 
            type="time" 
            value={time} 
            onChange={(e) => setTime(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Duration:</label>
          <input 
            type="text" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)} 
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Category: <span className="required">*</span></label>
          <input 
            type="text" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Organizer: <span className="required">*</span></label>
          <input 
            type="text" 
            value={organizer} 
            onChange={(e) => setOrganizer(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>NGO Name: <span className="required">*</span></label>
          <input 
            type="text" 
            value={ngoName} 
            onChange={(e) => setNgoName(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Importance Level:</label>
          <select 
            value={importance} 
            onChange={(e) => setImportance(e.target.value)}
          >
            <option value="">Select Importance Level</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Status:</label>
          <input 
            type="text" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Event Banner Image:</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
              <button type="button" className="cancel-button" onClick={handleImageCancel}>×</button>
            </div>
          )}
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Expected Attendance:</label>
          <input 
            type="number" 
            value={expectedAttendance} 
            onChange={(e) => setExpectedAttendance(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Costs/Funding:</label>
          <input 
            type="text" 
            value={costs} 
            onChange={(e) => setCosts(e.target.value)} 
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Registration Link:</label>
          <input 
            type="url" 
            value={registrationLink} 
            onChange={(e) => setRegistrationLink(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Donation Link:</label>
          <input 
            type="url" 
            value={donationLink} 
            onChange={(e) => setDonationLink(e.target.value)} 
          />
        </div>
        <div className="form-group">
          <label>Additional Notes:</label>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)} 
          />
        </div>
      </div>
      
      <button type="submit">Create Event</button>
    </form>
  );
};

export default EventDetailsForm;
