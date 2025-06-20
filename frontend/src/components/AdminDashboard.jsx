import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminDashboard.css'; // Import the CSS file for styling
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

export default function AdminDashboard() {
  const [recentMessage, setRecentMessage] = useState(null); // State for the most recent message
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentMessage = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.length > 0) {
        setRecentMessage(data[0]); // Set the most recent message (latest by creation date)
      } else {
        setRecentMessage(null); // No messages available
      }
    };

    fetchRecentMessage();
  }, []); // Fetch messages on component load

  const handlePostMessageClick = () => {
    navigate('/admin-dashboard/post-message'); // Navigate to the PostMessageForm
  };

  return (
    <div className="admin-dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="navbar-title">Admin Dashboard</h1>
        <div className="navbar-buttons">
          <button
            className="form-submission-button"
            onClick={() => navigate('/admin-dashboard/form-submissions')}
          >
            View Form Submissions
          </button>
          <LogoutButton /> {/* Add the LogoutButton */}
        </div>
      </nav>

      {/* Post Message Button */}
      <div className="post-message-section">
        <button onClick={handlePostMessageClick} className="post-button">
          Post Message
        </button>
      </div>

      {/* Recent Message Section */}
      <div className="recent-message-section">
        <h2 className="section-title">Most Recent Message</h2>
        {recentMessage ? (
          <div className="message-card">
            <p><strong>Department:</strong> {recentMessage.department}</p>
            <p><strong>Batch:</strong> {recentMessage.batch}</p>
            <p><strong>From:</strong> {recentMessage.from}</p>
            <p><strong>Subject:</strong> {recentMessage.subject}</p>
            <p><strong>Description:</strong> {recentMessage.description}</p>
            <p><strong>Link:</strong> <a href={recentMessage.link} target="_blank" rel="noopener noreferrer">{recentMessage.link}</a></p>
          </div>
        ) : (
          <p className="no-messages">No messages posted yet.</p>
        )}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Designed & Developed By Sky Minds. All Copy Rights Are Reserved under section @2025</p>
      </footer>
    </div>
  );
}
