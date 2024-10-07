import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here

    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', rollNo: '', email: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>

      {/* Contact Information - Email and Phone side by side */}
      <section className="contact-details">
        <div className="contact-methods">
          <div className="contact-method">
            <strong>Email: </strong>
            <a href="mailto:your-email@example.com">your-email@example.com</a>
          </div>
          <div className="contact-method">
            <strong>Phone: </strong>
            <span>+91 8450927956</span>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form">
        <h3>Send Us a Message</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="rollNo">Roll No:</label>
            <input
              type="text"
              name="rollNo"
              id="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              placeholder="Your roll number"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
