import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <LogoutButton /> {/* Add the LogoutButton */}
    </div>
  );
};

export default Dashboard;
