import React, { useState } from 'react';
import axios from 'axios';
import './css/contact.css';
import ParticlesComponent from './particles';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send message to the backend
    axios.post('http://localhost:5000/api/contact', formData)
      .then(response => {
        alert('Message sent!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      })
      .catch(error => {
        console.error('There was an error sending the message:', error);
        alert('Error sending message');
      });
  };

  return (
    <div className="contact-page">
      <ParticlesComponent id="particles" />
      <header className="contact-header">
        <h1 className="text-center">📞 Get in Touch</h1>
        <p className="text-center">Feel free to reach out for any queries, collaborations, or just to say hi!</p>
      </header>

      <section className="contact-container">
        {/* Contact Form */}
        <div className="contact-form">
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@domain.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="5"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message ✉️</button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="contact-details">
          <h2>📍 Our Address</h2>
          <p><strong>Address:</strong> Symbiosis Institute of Technology, Wathoda Layout, Nagpur, Maharashtra 440008</p>
          <p><strong>Website:</strong> <a href="https://sitnagpur.edu.in/" target="_blank" rel="noopener noreferrer">https://sitnagpur.edu.in/</a></p>
          <p><strong>Phone:</strong> +91 7126192370</p>
          <p><strong>Location:</strong> Symbiosis Institute of Technology, Nagpur</p>
          <div className="social-icons">
            <a href="https://www.facebook.com/SITNagpur24/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">🌐 Facebook</a>
            <a href="https://x.com/sitnagpur" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">🌐 Twitter</a>
            <a href="https://www.instagram.com/symbiosis_sit_nagpur/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">🌐 Instagram</a>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <h2>📌 Find Us Here</h2>
        <iframe
          title="Google Map"
          width="100%"
          height="400"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1106.4517128474308!2d79.15931521057327!3d21.12671016092814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c75403d77b61%3A0xb5552439e81b172d!2sSymbiosis%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1734747790297!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
        />
      </section>
    </div>
  );
}
