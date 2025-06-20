import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NotificationDetails.css'; // Import the CSS file for styling

export default function NotificationDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const notification = location.state?.notification;

  if (!notification) {
    return (
      <div className="notification-details-container">
        <div className="center-content">
          <h1>Notification Details</h1>
          <p>No notification details available.</p>
          <button onClick={() => navigate('/student-dashboard', { replace: true })}>Go Back</button> {/* Ensure proper navigation */}
        </div>
      </div>
    );
  }

  return (
    <div className="notification-details-container">
      <div className="center-content">
        <h1>Notification Details</h1>
        <p><strong>Department:</strong> {notification.department}</p>
        <p><strong>Batch:</strong> {notification.batch}</p>
        <p><strong>From:</strong> {notification.from}</p>
        <p><strong>Subject:</strong> {notification.subject}</p>
        <p><strong>Description:</strong> {notification.description}</p>
        <button onClick={() => navigate('/student-dashboard', { replace: true })}>Go Back</button> {/* Ensure proper navigation */}
      </div>
    </div>
  );
}
