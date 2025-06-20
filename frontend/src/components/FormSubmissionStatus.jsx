import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormSubmissionStatus.css';

const FormSubmissionStatus = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubmissions = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/form-submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setSubmissions(data);
      } else {
        console.error(data.message || 'Failed to fetch form submissions');
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="form-submission-status-page">
      <h1 className="welcome-text">Welcome to the Form Submission Status Page</h1>
      <div className="form-submission-status-header">
        <h2>Form Submission Status</h2>
      </div>
      <div className="form-submission-status-container">
        <h3>Form Submissions</h3>
        <ul>
          {submissions.map((submission, index) => (
            <li key={`${submission.studentId}-${index}`}>
              {submission.studentName} - {submission.status ? 'Completed' : 'Pending'}
            </li>
          ))}
        </ul>
        <button className="back-button" onClick={() => navigate('/admin-dashboard')}>
          Back to Dashboard
        </button>
      </div>
      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">Designed & Developed By Sky Minds. All Copy Rights Are Reserved under section @2025</p>
      </footer>
    </div>
  );
};

export default FormSubmissionStatus;
