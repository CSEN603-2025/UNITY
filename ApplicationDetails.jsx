import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ApplicationDetails.css';

const ApplicationDetails = ({ applications = [], internships = [], onStatusChange }) => {
  const { id } = useParams();
  const history = useHistory();
  
  const application = applications.find(app => app.id.toString() === id);
  const internship = application ? internships.find(i => i.id === application.internshipId) : null;

  const handleStatusChange = (newStatus) => {
    if (onStatusChange && application) {
      onStatusChange(application.id, newStatus);
      if (newStatus === 'completed') {
        history.push(`/evaluation/${application.id}`);
      }
    }
  };

  if (!application) {
    return (
      <div className="application-details-container">
        <div className="not-found">
          <i className="fas fa-exclamation-circle"></i>
          <h2>Intern record not found</h2>
          <button onClick={() => history.goBack()} className="back-to-list">
            Return to Intern List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-details-container">
      <div className="application-header">
        <button onClick={() => history.goBack()} className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Interns
        </button>
        <h1>Intern Details</h1>
      </div>

      <div className="application-card">
        <div className="applicant-profile">
          <div className="applicant-avatar">
            {application.applicantName?.charAt(0) || 'A'}
          </div>
          <div className="applicant-meta">
            <h2>{application.applicantName}</h2>
            <p className="applied-position">
              {internship?.position || 'Unknown Position'}
            </p>
            <div className="internship-dates">
              {application.startDate && (
                <p>Start Date: {new Date(application.startDate).toLocaleDateString()}</p>
              )}
              {application.endDate && (
                <p>End Date: {new Date(application.endDate).toLocaleDateString()}</p>
              )}
            </div>
            <div className={`status-badge ${application.status}`}>
              {application.status}
            </div>
          </div>
        </div>

        <div className="action-buttons">
          {application.status === 'accepted' && (
            <button 
              onClick={() => handleStatusChange('current')}
              className="action-button start-internship"
            >
              <i className="fas fa-user-check"></i> Start Internship
            </button>
          )}
          
          {application.status === 'current' && (
            <button 
              onClick={() => handleStatusChange('completed')}
              className="action-button complete-internship"
            >
              <i className="fas fa-graduation-cap"></i> Complete Internship
            </button>
          )}
          
          {application.status === 'completed' && application.evaluation && (
            <button 
              onClick={() => history.push(`/evaluation/${application.id}`)}
              className="action-button view-evaluation"
            >
              <i className="fas fa-clipboard-check"></i> View Evaluation
            </button>
          )}
        </div>

        {application.status === 'completed' && application.evaluation && (
          <div className="evaluation-summary">
            <h3><i className="fas fa-star"></i> Evaluation Summary</h3>
            <div className="evaluation-details">
              <div className="evaluation-item">
                <span className="evaluation-label">Performance:</span>
                <span className="performance-rating">
                  {Array(5).fill().map((_, i) => (
                    <i 
                      key={i} 
                      className={`fas fa-star ${i < application.evaluation.performance ? 'filled' : ''}`}
                    />
                  ))}
                </span>
              </div>
              <div className="evaluation-item">
                <span className="evaluation-label">Recommendation:</span>
                <span className="recommendation-badge">
                  {application.evaluation.recommendation === 'hire' ? 'Hire' : 
                   application.evaluation.recommendation === 'consider' ? 'Consider' : 'Not Hire'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetails;
