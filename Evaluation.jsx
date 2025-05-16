import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Evaluation.css';

const Evaluation = ({ applications = [], internships = [], onSaveEvaluation }) => {
  const { id } = useParams();
  const history = useHistory();
  const [evaluation, setEvaluation] = useState({
    performance: 3,
    skills: [],
    strengths: '',
    areasForImprovement: '',
    recommendation: '',
    finalComments: ''
  });

  const application = applications.find(app => app.id.toString() === id);
  const internship = application ? internships.find(i => i.id === application.internshipId) : null;

  useEffect(() => {
    if (application?.evaluation) {
      setEvaluation(application.evaluation);
    }
  }, [application]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvaluation(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillToggle = (skill) => {
    setEvaluation(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveEvaluation(application.id, evaluation);
    history.push(`/applications/${application.id}`);
  };

  if (!application || application.status !== 'completed') {
    return (
      <div className="evaluation-container">
        <div className="not-authorized">
          <i className="fas fa-exclamation-triangle"></i>
          <h2>Evaluation not available</h2>
          <p>Only completed internships can be evaluated</p>
          <button onClick={() => history.goBack()}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="evaluation-container">
      <h1>Internship Evaluation</h1>
      <h2>{application.applicantName} - {internship?.position}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Performance Rating</h3>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating}>
                <input
                  type="radio"
                  name="performance"
                  value={rating}
                  checked={evaluation.performance === rating}
                  onChange={handleChange}
                />
                {rating}
              </label>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Skills Demonstrated</h3>
          <div className="skills-grid">
            {['Technical Skills', 'Problem Solving', 'Communication', 'Teamwork', 'Initiative', 'Adaptability'].map(skill => (
              <div key={skill} className="skill-item">
                <input
                  type="checkbox"
                  id={`skill-${skill}`}
                  checked={evaluation.skills.includes(skill)}
                  onChange={() => handleSkillToggle(skill)}
                />
                <label htmlFor={`skill-${skill}`}>{skill}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Strengths</h3>
          <textarea
            name="strengths"
            value={evaluation.strengths}
            onChange={handleChange}
            placeholder="What did the intern do particularly well?"
          />
        </div>

        <div className="form-section">
          <h3>Areas for Improvement</h3>
          <textarea
            name="areasForImprovement"
            value={evaluation.areasForImprovement}
            onChange={handleChange}
            placeholder="What could the intern work on?"
          />
        </div>

        <div className="form-section">
          <h3>Recommendation</h3>
          <div className="recommendation-options">
            <label>
              <input
                type="radio"
                name="recommendation"
                value="hire"
                checked={evaluation.recommendation === 'hire'}
                onChange={handleChange}
              />
              <span className="recommendation-badge hire">Hire</span>
            </label>
            <label>
              <input
                type="radio"
                name="recommendation"
                value="consider"
                checked={evaluation.recommendation === 'consider'}
                onChange={handleChange}
              />
              <span className="recommendation-badge consider">Consider</span>
            </label>
            <label>
              <input
                type="radio"
                name="recommendation"
                value="notHire"
                checked={evaluation.recommendation === 'notHire'}
                onChange={handleChange}
              />
              <span className="recommendation-badge not-hire">Not Hire</span>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>Final Comments</h3>
          <textarea
            name="finalComments"
            value={evaluation.finalComments}
            onChange={handleChange}
            placeholder="Overall comments about the internship experience"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => history.goBack()}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            Save Evaluation
          </button>
        </div>
      </form>
    </div>
  );
};

export default Evaluation;
