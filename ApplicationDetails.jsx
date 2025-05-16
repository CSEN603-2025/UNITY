import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './ApplicationDetails.css';

const ApplicationDetails = ({ applications = [], internships = [], onStatusChange }) => {
  const { id } = useParams();
  const history = useHistory();
  
  const application = applications.find(app => app.id.toString() === id);
  const internship = application ? internships.find(i => i.id === application.internshipId) : null;

  const downloadDocument = (docUrl, docName) => {
    const link = document.createElement('a');
    link.href = docUrl;
    link.download = docName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleStatusChange = (newStatus) => {
    if (onStatusChange && application) {
      onStatusChange(application.id, newStatus);
    }
  };

  if (!application) {
    return (
      <div className="application-details-container">
        <div className="not-found">
          <i className="fas fa-exclamation-circle"></i>
          <h2>Application not found</h2>
          <button onClick={() => history.goBack()} className="back-to-list">
            Return to Applications List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="application-details-container">
      <div className="application-header">
        <button onClick={() => history.goBack()} className="back-button">
          <i className="fas fa-arrow-left"></i> Back to Applications
        </button>
        <h1>Application Details</h1>
      </div>

      <div className="application-card">
        <div className="applicant-profile">
          <div className="applicant-avatar">
            {application.applicantName?.charAt(0) || 'A'}
          </div>
          <div className="applicant-meta">
            <h2>{application.applicantName}</h2>
            <p className="applied-position">
              Applied for: <strong>{internship?.position || 'Unknown Position'}</strong>
            </p>
            <div className={`status-badge ${application.status}`}>
              {application.status}
            </div>
          </div>
        </div>

        <div className="details-grid">
          <div className="detail-section">
            <h3><i className="fas fa-info-circle"></i> Basic Information</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Email:</label>
                <p>{application.applicantEmail || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <p>{application.applicantPhone || 'Not provided'}</p>
              </div>
              <div className="info-item">
                <label>Applied On:</label>
                <p>{new Date(application.applicationDate).toLocaleDateString()}</p>
              </div>
              <div className="info-item">
                <label>Current Status:</label>
                <p className="current-status">{application.status}</p>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><i className="fas fa-graduation-cap"></i> Education</h3>
            {application.education ? (
              <div className="info-grid">
                <div className="info-item">
                  <label>University:</label>
                  <p>{application.education.university}</p>
                </div>
                <div className="info-item">
                  <label>Major:</label>
                  <p>{application.education.major}</p>
                </div>
                <div className="info-item">
                  <label>Year/GPA:</label>
                  <p>{application.education.year} {application.education.gpa && `(GPA: ${application.education.gpa})`}</p>
                </div>
                {application.education.degree && (
                  <div className="info-item">
                    <label>Degree:</label>
                    <p>{application.education.degree}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="no-info">No education information provided</p>
            )}
          </div>

          <div className="detail-section">
            <h3><i className="fas fa-briefcase"></i> Work Experience</h3>
            {application.experience?.length > 0 ? (
              <ul className="experience-list">
                {application.experience.map((exp, index) => (
                  <li key={index}>
                    <div className="experience-item">
                      <div className="experience-header">
                        <strong>{exp.role}</strong>
                        <span className="experience-duration">{exp.duration}</span>
                      </div>
                      <div className="experience-company">{exp.company}</div>
                      {exp.description && (
                        <p className="experience-description">{exp.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="no-info">No work experience provided</p>
            )}
          </div>

          <div className="detail-section">
            <h3><i className="fas fa-file-alt"></i> Application Documents</h3>
            {application.documents?.length > 0 ? (
              <div className="documents-grid">
                {application.documents.map((doc, index) => (
                  <div key={index} className="document-card">
                    <div className="document-icon">
                      <i className={`fas ${doc.type === 'cv' ? 'fa-file-user' : 
                                    doc.type === 'transcript' ? 'fa-file-certificate' : 
                                    'fa-file-alt'}`}></i>
                    </div>
                    <div className="document-info">
                      <div className="document-name">{doc.name}</div>
                      <div className="document-type">{doc.type}</div>
                    </div>
                    <button 
                      onClick={() => downloadDocument(doc.url, doc.name)}
                      className="download-button"
                    >
                      <i className="fas fa-download"></i>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-info">No documents uploaded</p>
            )}
          </div>

          <div className="detail-section skills-section">
            <h3><i className="fas fa-star"></i> Skills & Qualifications</h3>
            {application.skills?.length > 0 ? (
              <div className="skills-list">
                {application.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="no-info">No skills information provided</p>
            )}
          </div>

          <div className="detail-section notes-section">
            <h3><i className="fas fa-edit"></i> Evaluation Notes</h3>
            <textarea
              placeholder="Add your evaluation notes here..."
              className="notes-textarea"
            />
            <button className="save-notes">
              Save Evaluation Notes
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            onClick={() => handleStatusChange('accepted')}
            className={`action-button accept ${application.status === 'accepted' ? 'active' : ''}`}
          >
            <i className="fas fa-check"></i> Accept Application
          </button>
          <button 
            onClick={() => handleStatusChange('rejected')}
            className={`action-button reject ${application.status === 'rejected' ? 'active' : ''}`}
          >
            <i className="fas fa-times"></i> Reject Application
          </button>
          <button 
            onClick={() => handleStatusChange('finalized')}
            className={`action-button finalize ${application.status === 'finalized' ? 'active' : ''}`}
          >
            <i className="fas fa-star"></i> Finalize for Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
