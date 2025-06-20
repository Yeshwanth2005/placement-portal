import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import StudentDashboard from './components/StudentDashboard';
import NotificationDetails from './components/NotificationDetails.jsx';
import AdminDashboard from './components/adminDashboard';
import PostMessageForm from './components/PostMessageForm';
import LogoutButton from './components/LogoutButton'; // Import the LogoutButton component
import FormSubmissionStatus from './components/FormSubmissionStatus'; // Import the FormSubmissionStatus component
import './App.css';

const App = () => {
  const [adminMessages, setAdminMessages] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
  }, []);

  const handleMessageSend = (message) => {
    setAdminMessages([...adminMessages, { id: adminMessages.length + 1, ...message }]);
  };

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              {role === 'admin' ? (
                <AdminDashboard messages={adminMessages} onMessageSend={handleMessageSend} />
              ) : (
                <StudentDashboard />
              )}
            </PrivateRoute>
          }
        />
        <Route
          path="/student-dashboard"
          element={
            <PrivateRoute>
              <StudentDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/student-dashboard/notification/:id"
          element={
            <PrivateRoute>
              <NotificationDetails />
            </PrivateRoute>
          }
        />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin-dashboard/post-message"
          element={
            role === 'admin' ? (
              <PrivateRoute>
                <PostMessageForm onMessageSend={handleMessageSend} />
              </PrivateRoute>
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/admin-dashboard/form-submissions"
          element={
            <PrivateRoute>
              <FormSubmissionStatus />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
