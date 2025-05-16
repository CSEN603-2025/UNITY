import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ApplicationDetails.css';

const ApplicationDetails = ({ applications = [], internships = [] }) => {
  const { id } = useParams();
  const history = useHistory();
  
  const application = applications.find(app => app.id.toString() === id);
  const internship = application ? 
    internships.find(i => i.id === application.internshipId) : null;

  if (!application) {
    return (
      <div className="application-details-container">
        <div className="not-found">
          <h2>Application not found</h2>
          <button onClick={() => history.goBack()}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-details-container">
      <div className="application-header">
        <button 
          onClick={() => history.goBack()}
          className="back-button"
        >
          &larr; Back to Applications
        </button>
        <h1>Application Details</h1>
      </div>

      <div className="application-card">
        <div className="applicant-info">
          <h2>{application.applicantName}</h2>
          <p className="applied-for">
            Applied for: <strong>{internship?.position || 'Unknown Position'}</strong>
          </p>
          <div className="status-container">
            <span className={`status-badge ${application.status}`}>
              {application.status}
            </span>
            <p className="applied-date">
              Applied on: {new Date(application.applicationDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-section">
            <h3>Contact Information</h3>
            <p><strong>Email:</strong> {application.applicantEmail || 'Not provided'}</p>
            <p><strong>Phone:</strong> {application.applicantPhone || 'Not provided'}</p>
          </div>

          <div className="detail-section">
            <h3>Education</h3>
            <p><strong>University:</strong> {application.education?.university || 'Not provided'}</p>
            <p><strong>Major:</strong> {application.education?.major || 'Not provided'}</p>
            <p><strong>Year:</strong> {application.education?.year || 'Not provided'}</p>
          </div>

          <div className="detail-section">
            <h3>Experience</h3>
            {application.experience?.length > 0 ? (
              <ul className="experience-list">
                {application.experience.map((exp, index) => (
                  <li key={index}>
                    <strong>{exp.role}</strong> at {exp.company} ({exp.duration})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No experience provided</p>
            )}
          </div>

          <div className="detail-section">
            <h3>Documents</h3>
            {application.documents?.length > 0 ? (
              <div className="documents-list">
                {application.documents.map((doc, index) => (
                  <a 
                    key={index} 
                    href={doc.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="document-link"
                  >
                    <i className="fas fa-file-alt"></i> {doc.name}
                  </a>
                ))}
              </div>
            ) : (
              <p>No documents uploaded</p>
            )}
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-button accept">
            <i className="fas fa-check"></i> Accept
          </button>
          <button className="action-button reject">
            <i className="fas fa-times"></i> Reject
          </button>
          <button className="action-button finalize">
            <i className="fas fa-star"></i> Finalize
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
