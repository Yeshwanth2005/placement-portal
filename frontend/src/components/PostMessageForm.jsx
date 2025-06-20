import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './postMessageForm.css'; // Import the CSS file for styling

export default function PostMessageForm({ onMessageSend }) {
  const [formData, setFormData] = useState({
    department: '',
    batch: '',
    from: '',
    subject: '',
    description: '',
    link: '', // Add link field
  });
  const [showSuccess, setShowSuccess] = useState(false); // State to show success card
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSendMessage = async () => {
    if (formData.department && formData.batch && formData.from && formData.subject && formData.description) {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch('http://localhost:5000/api/auth/post-message', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error('Failed to post message:', data.message || 'Unknown error');
          alert(data.message || 'Failed to post message');
          return;
        }

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
        navigate('/admin-dashboard');
      } catch (error) {
        console.error('Error during message posting:', error.message);
        alert('Unable to connect to the server. Please try again later.');
      }
    } else {
      alert('All fields are required');
    }
  };

  const handleCancel = () => {
    navigate('/admin-dashboard'); // Redirect back to the admin dashboard
  };

  return (
    <div className="post-message-form-page">
      <div className="post-message-form-container">
        <h1>Post a Message</h1>
        {showSuccess && (
          <div className="success-card">
            <p>Message sent successfully!</p>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="batch">Batch</label>
          <select
            id="batch"
            name="batch"
            value={formData.batch}
            onChange={handleInputChange}
            className="form-control"
          >
            <option value="">Select Batch</option>
            <option value="2021-2024">2021-2024</option>
            <option value="2022-2026">2022-2026</option>
            <option value="2023-2027">2023-2027</option>
            <option value="2024-2028">2024-2028</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="from">From</label>
          <input
            type="text"
            id="from"
            name="from"
            value={formData.from}
            onChange={handleInputChange}
            placeholder="Enter your name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            placeholder="Enter subject"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter message description"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleInputChange}
            placeholder="Enter job or form link"
            className="form-control"
          />
        </div>
        <div className="form-buttons">
          <button onClick={handleSendMessage} className="send-button">
            Send
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
      <footer className="footer">
        <p>Designed & Developed By Sky Minds. All Copy Rights Are Reserved under section @2025</p>
      </footer>
    </div>
  );
}
