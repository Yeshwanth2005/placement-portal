import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    department: '',
    academicYear: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (res.ok) {
      alert('Signup successful! Please log in.');
      navigate('/login');
    } else {
      alert(data.message || 'Signup failed');
    }
  };

  return (
    <div className="signup-page">
      <h1 className="welcome-text">Welcome to College Placement Portal</h1>
      <div className="signup-container">
        <form onSubmit={handleSignup}>
          <h2>Sign Up</h2>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <select
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Department</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="MECH">MECH</option>
          </select>
          <select
            name="academicYear"
            value={formData.academicYear}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Academic Year</option>
            <option value="2021-2024">2021-2024</option>
            <option value="2022-2026">2022-2026</option>
            <option value="2023-2027">2023-2027</option>
            <option value="2024-2028">2024-2028</option>
          </select>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <footer className="footer">
        <p>Designed & Developed By Sky Minds. All Copy Rights Are Reserved under section @2025</p>
      </footer>
    </div>
  );
};

export default SignupForm;
