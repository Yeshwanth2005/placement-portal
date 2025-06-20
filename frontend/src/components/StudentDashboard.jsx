import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './studentDashboard.css'; // Import the CSS file for styling
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

export default function StudentDashboard() {
  const [studentName, setStudentName] = useState(''); // Initialize with an empty string
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentName = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setStudentName(data.fullName);
      } else {
        console.error(data.message || 'Failed to fetch student name');
      }
    };

    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/messages', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setNotifications(data); // Ensure messages are set correctly
      } else {
        console.error(data.message || 'Failed to fetch notifications');
      }
    };

    fetchStudentName();
    fetchNotifications(); // Fetch messages on every load
  }, []);

  const handleNotificationClick = (notification, event) => {
    event.preventDefault(); // Prevent default anchor tag behavior
    navigate(`/student-dashboard/notification/${notification._id}`, { state: { notification } });
  };

  const handleFormSubmission = async (messageId) => {
    const token = localStorage.getItem('token');
    const studentId = localStorage.getItem('userId'); // Ensure the student ID is stored in localStorage

    const res = await fetch('http://localhost:5000/api/auth/update-form-submission', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ messageId, studentId }),
    });

    if (res.ok) {
      alert('Form submission marked as completed.');
      fetchNotifications(); // Refresh notifications
    } else {
      const data = await res.json();
      console.error(data.message || 'Failed to update form submission');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <h1 className="navbar-title">Student Dashboard</h1>
        <LogoutButton /> {/* Add the LogoutButton */}
      </nav>
      <br />
      <br></br>
      {/* Notifications Section */}
      <div className="notifications-section">
        <h1 className='x'>Welcome, {studentName}</h1>
        <h3>Notifications</h3>
        <table className="notifications-table">
          <thead>
            <tr>
              <th>Department</th>
              <th>Batch</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Link</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((notification) => (
              <tr key={notification._id}>
                <td>{notification.department}</td>
                <td>{notification.batch}</td>
                <td>{notification.subject}</td>
                <td>
                  <a href="#" onClick={(event) => handleNotificationClick(notification, event)}>
                    {notification.description}
                  </a>
                </td>
                <td>
                  <a href={notification.link} target="_blank" rel="noopener noreferrer">
                    {notification.link ? 'Open Link' : 'No Link'}
                  </a>
                </td>
                <td>
                  <button onClick={() => handleFormSubmission(notification._id)}>
                    Mark as Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Designed & Developed By Sky Minds. All Copy Rights Are Reserved under section @2025</p>
      </footer>
    </div>
  );
}