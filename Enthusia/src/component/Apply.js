import React, { useState } from 'react';
import ParticlesComponent from './particles';
import './css/apply.css';
import axios from 'axios';
export default function Apply() {
  const [eventDetails, setEventDetails] = useState({});
  const [selectedEvent, setSelectedEvent] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const events = {
    "SITnnovate": 600,
    "SIT CodeSprint": 350,
    "SI Tank": 350,
  };

  const initialDetails = {
    teamName: '',
    captainName: '',
    captainEmail: '',
    captainContact: '',
    college: '',
    city: '',
    teamMembers: Array(4).fill({ name: '', email: '', college: '' }),
  };

  const handleEventChange = (event) => {
    const selected = event.target.value;
    setSelectedEvent(selected);
    const memberCount = selected === 'SITnnovate' ? 4 : 3;
    setEventDetails({
      ...initialDetails,
      teamMembers: Array(memberCount).fill({ name: '', email: '', college: '' }),
    });
    setTotalCost(events[selected]);
  };

  const handleInputChange = (e, index, field) => {
    const { name, value } = e.target;

    if (field === 'teamMembers') {
      const updatedMembers = [...eventDetails.teamMembers];
      updatedMembers[index] = { ...updatedMembers[index], [name]: value };
      setEventDetails({ ...eventDetails, teamMembers: updatedMembers });
    } else {
      setEventDetails({ ...eventDetails, [name]: value });
    }
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Map event names to backend endpoints
    let endpoint = '';
    if (selectedEvent === 'SITnnovate') {
      endpoint = 'hackathon';
    } else if (selectedEvent === 'SIT CodeSprint') {
      endpoint = 'codeSprint';
    } else if (selectedEvent === 'SI Tank') {
      endpoint = 'sitank';
    }
  
    if (!endpoint) {
      alert('Invalid event selection. Please try again.');
      return;
    }
  
    try {
      // Make POST request to backend
      const response = await axios.post(`http://localhost:5000/api/${endpoint}/`, eventDetails);
      console.log('Server Response:', response.data);
      alert('Application Submitted Successfully!');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    }
  
    console.log(eventDetails);
  };
  

  return (
    <div className="apply">
      <ParticlesComponent id="particles" />
      <div className="form-container">
        <h1>Event Application</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Select Event:
            <select value={selectedEvent} onChange={handleEventChange} required>
              <option value="">--Select--</option>
              {Object.keys(events).map((event) => (
                <option key={event} value={event}>
                  {event} ({events[event]} Rs)
                </option>
              ))}
            </select>
          </label>

          {selectedEvent && (
            <div>
              <h2>Team Details</h2>
              <label>
                Team Name:
                <input
                  type="text"
                  name="teamName"
                  value={eventDetails.teamName}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </label>
              <label>
                Captain Name:
                <input
                  type="text"
                  name="captainName"
                  value={eventDetails.captainName}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="captainEmail"
                  value={eventDetails.captainEmail}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </label>
              <label>
                Contact Number:
                <input
                  type="text"
                  name="captainContact"
                  value={eventDetails.captainContact}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </label>
              <label>
                College:
                <input
                  type="text"
                  name="college"
                  value={eventDetails.college}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </label>
              <label>
                City:
                <input
                  type="text"
                  name="city"
                  value={eventDetails.city}
                  onChange={(e) => handleInputChange(e)}
                  required
                />
              </label>
              <h3>Team Members</h3>
              {eventDetails.teamMembers.map((member, index) => (
                <div key={index}>
                  <label>
                    Member {index + 1} Name:
                    <input
                      type="text"
                      name="name"
                      value={member.name}
                      onChange={(e) => handleInputChange(e, index, 'teamMembers')}
                      required
                    />
                  </label>
                  <label>
                    Member {index + 1} Email:
                    <input
                      type="email"
                      name="email"
                      value={member.email}
                      onChange={(e) => handleInputChange(e, index, 'teamMembers')}
                      required
                    />
                  </label>
                  <label>
                    Member {index + 1} College:
                    <input
                      type="text"
                      name="college"
                      value={member.college}
                      onChange={(e) => handleInputChange(e, index, 'teamMembers')}
                      required
                    />
                  </label>
                </div>
              ))}
            </div>
          )}

          <h3>Total Cost: {totalCost} Rs</h3>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
