import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './dashboard.css';

const Uploader = () => {
  const history = useHistory();
  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    setDocuments(prev => [...prev, ...files]);
    addNotification({
      type: 'success',
      message: 'Documents uploaded successfully',
      timestamp: new Date()
    });
  };

  const addNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== notification));
    }, 10000);
  };

  return (
    <div className="scad-dashboard">
      <nav className="dashboard-nav">
        <div className="nav-logo">SCAD</div>
        <div className="nav-right">
          <button 
            onClick={() => history.push('/dashboard')}
            className="nav-button"
          >
            Back to Dashboard
          </button>
          <div className="profile-icon">C</div>
        </div>
      </nav>

      {notifications.length > 0 && (
        <div className="notification-banner">
          {notifications[0].message}
        </div>
      )}

      <div className="uploader-container">
        <h1>Company Verification Documents</h1>
        <div className="upload-box">
          <label className="upload-label">
            <input 
              type="file" 
              multiple 
              onChange={handleDocumentUpload}
              className="file-input"
            />
            <div className="upload-content">
              <span className="upload-icon">+</span>
              <p>Drag & drop files here or click to browse</p>
              <p className="small">(PDF, DOC, JPG, PNG up to 10MB)</p>
            </div>
          </label>
        </div>

        {documents.length > 0 && (
          <div className="documents-list">
            <h2>Uploaded Documents</h2>
            <ul>
              {documents.map((doc, index) => (
                <li key={index}>
                  <span>{doc.name}</span>
                  <span>{(doc.size / 1024 / 1024).toFixed(2)} MB</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Uploader;