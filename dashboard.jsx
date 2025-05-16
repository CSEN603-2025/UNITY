import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; 

const Dashboard = () => {
  const history = useHistory();
  const [internships, setInternships] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [applications, setApplications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [stats, setStats] = useState({
    totalViews: 0,
    applicationsReceived: 0,
    activeInterns: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Form state with all required fields
  const [formData, setFormData] = useState({
    position: '',
    type: 'paid',
    duration: '',
    salary: '',
    skills: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    responsibilities: '',
    requirements: '',
    benefits: '',
    applicationDeadline: '',
    contactEmail: '',
    status: 'active'
  });

  // Load data from localStorage or API
  useEffect(() => {
    const loadData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const savedInternships = JSON.parse(localStorage.getItem('internships')) || [];
        const savedApplications = JSON.parse(localStorage.getItem('applications')) || [];
        
        setInternships(savedInternships);
        setApplications(savedApplications);
        calculateStats(savedInternships, savedApplications);
      } catch (error) {
        console.error('Error loading data:', error);
        addNotification('Failed to load data', 'error');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('internships', JSON.stringify(internships));
    localStorage.setItem('applications', JSON.stringify(applications));
    calculateStats(internships, applications);
  }, [internships, applications]);

  const calculateStats = (internships, applications) => {
    setStats({
      totalViews: internships.reduce((sum, item) => sum + (item.views || 0), 0),
      applicationsReceived: applications.length,
      activeInterns: internships.filter(i => i.status === 'active').length
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    if (isEditing) {
      // Update existing internship
      setInternships(internships.map(item => 
        item.id === currentInternship.id ? { ...formData, id: currentInternship.id } : item
      ));
      addNotification('Internship updated successfully', 'success');
    } else {
      // Add new internship
      const newInternship = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString(),
        views: 0
      };
      setInternships([...internships, newInternship]);
      addNotification('New internship created successfully', 'success');
    }
    
    resetForm();
  };

  const validateForm = () => {
    if (!formData.position) {
      addNotification('Position title is required', 'error');
      return false;
    }
    if (!formData.duration) {
      addNotification('Duration is required', 'error');
      return false;
    }
    if (formData.type === 'paid' && !formData.salary) {
      addNotification('Salary is required for paid internships', 'error');
      return false;
    }
    return true;
  };

  const editInternship = (internship) => {
    setFormData(internship);
    setCurrentInternship(internship);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteInternship = (id) => {
    if (window.confirm('Are you sure you want to delete this internship?')) {
      setInternships(internships.filter(item => item.id !== id));
      setApplications(applications.filter(app => app.internshipId !== id));
      addNotification('Internship deleted successfully', 'success');
    }
  };

  const toggleInternshipStatus = (id) => {
    setInternships(internships.map(item => 
      item.id === id 
        ? { ...item, status: item.status === 'active' ? 'inactive' : 'active' } 
        : item
    ));
    addNotification('Internship status updated', 'info');
  };

  const resetForm = () => {
    setFormData({
      position: '',
      type: 'paid',
      duration: '',
      salary: '',
      skills: '',
      description: '',
      location: '',
      startDate: '',
      endDate: '',
      responsibilities: '',
      requirements: '',
      benefits: '',
      applicationDeadline: '',
      contactEmail: '',
      status: 'active'
    });
    setIsEditing(false);
    setCurrentInternship(null);
  };

  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.skills.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || internship.type === filterType;
    return matchesSearch && matchesType;
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Navigation */}
      
      <nav className="dashboard-nav">
        <Link to="/applications" className="nav-button">
  <i className="fas fa-users"></i> Applications
        </Link>
        <div className="nav-logo">SCAD</div>
        <div className="nav-actions">
          <Link to="/notifications" className="nav-button notification-link">
          <FaBell className="bell-icon" />
          {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
        </Link>
          <button 
            onClick={() => history.push('/uploader')}
            className="nav-button"
          >
            <i className="fas fa-file-upload"></i> Documents
          </button>
          <div className="profile-menu">
            <div className="profile-icon">
              <i className="fas fa-user-tie"></i>
            </div>
          </div>
        </div>
      </nav>

      {/* Notifications */}
      <div className="notifications-container">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        ))}
      </div>

      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Internship Management Dashboard</h1>
          <p>Create, manage, and track your internship programs</p>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Views</h3>
            <p>{stats.totalViews}</p>
          </div>
          <div className="stat-card">
            <h3>Applications</h3>
            <p>{stats.applicationsReceived}</p>
          </div>
          <div className="stat-card">
            <h3>Active Interns</h3>
            <p>{stats.activeInterns}</p>
          </div>
        </div>
      </header>

      {/* Internship Form Section */}
      <section className={`form-section ${isEditing ? 'editing' : ''}`}>
        <div className="section-header">
          <h2>{isEditing ? 'Edit Internship' : 'Create New Internship'}</h2>
          {isEditing && (
            <button onClick={resetForm} className="cancel-button">
              Cancel Editing
            </button>
          )}
        </div>
        
        <form onSubmit={handleSubmit} className="internship-form">
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-group">
              <label>Position Title*</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                placeholder="e.g. Frontend Developer Intern"
                required
              />
            </div>

            <div className="form-group">
              <label>Internship Type*</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="paid">Paid</option>
                <option value="unpaid">Unpaid</option>
                <option value="stipend">Stipend</option>
              </select>
            </div>

            {/* Duration & Dates */}
            <div className="form-group">
              <label>Duration*</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                placeholder="e.g. 3 months, 6 months"
                required
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </div>

            {/* Compensation */}
            {formData.type === 'paid' && (
              <div className="form-group">
                <label>Salary*</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g. €1000/month"
                  required={formData.type === 'paid'}
                />
              </div>
            )}

            {formData.type === 'stipend' && (
              <div className="form-group">
                <label>Stipend Amount*</label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  placeholder="e.g. €500/month"
                  required
                />
              </div>
            )}

            {/* Location */}
            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. Berlin, Germany or Remote"
              />
            </div>

            {/* Skills */}
            <div className="form-group">
              <label>Required Skills*</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="e.g. JavaScript, React, UI/UX Design"
                required
              />
            </div>

            {/* Application Details */}
            <div className="form-group">
              <label>Application Deadline</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Email*</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleInputChange}
                placeholder="hr@yourcompany.com"
                required
              />
            </div>

            {/* Detailed Information */}
            <div className="form-group span-2">
              <label>Job Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>

            <div className="form-group span-2">
              <label>Key Responsibilities</label>
              <textarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleInputChange}
                rows="4"
                placeholder="List the main tasks the intern will perform"
              />
            </div>

            <div className="form-group span-2">
              <label>Requirements*</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleInputChange}
                rows="4"
                required
                placeholder="List the qualifications and skills required"
              />
            </div>

            <div className="form-group span-2">
              <label>Benefits</label>
              <textarea
                name="benefits"
                value={formData.benefits}
                onChange={handleInputChange}
                rows="4"
                placeholder="What will the intern gain from this position?"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              {isEditing ? 'Update Internship' : 'Create Internship'}
            </button>
          </div>
        </form>
      </section>

      {/* Internships List Section */}
      <section className="list-section">
        <div className="section-header">
          <h2>Your Internship Postings</h2>
          <div className="list-controls">
            <div className="search-box">
              <i className="fas fa-search"></i>
              <input
                type="text"
                placeholder="Search internships..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Types</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="stipend">Stipend</option>
            </select>
          </div>
        </div>

        {filteredInternships.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-briefcase"></i>
            <p>No internships match your search criteria</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setFilterType('all');
              }}
              className="reset-button"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="internships-grid">
            {filteredInternships.map(internship => (
              <div key={internship.id} className={`internship-card ${internship.status}`}>
                <div className="card-header">
                  <div className="card-title">
                    <h3>{internship.position}</h3>
                    <span className={`status-badge ${internship.status}`}>
                      {internship.status}
                    </span>
                  </div>
                  <span className={`type-badge ${internship.type}`}>
                    {internship.type}
                  </span>
                </div>

                <div className="card-details">
                  <div className="detail-row">
                    <span className="detail-label">Duration:</span>
                    <span>{internship.duration}</span>
                  </div>
                  {(internship.type === 'paid' || internship.type === 'stipend') && (
                    <div className="detail-row">
                      <span className="detail-label">Compensation:</span>
                      <span>{internship.salary}</span>
                    </div>
                  )}
                  <div className="detail-row">
                    <span className="detail-label">Skills:</span>
                    <span>{internship.skills}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Location:</span>
                    <span>{internship.location || 'Not specified'}</span>
                  </div>
                </div>

                <div className="card-footer">
                  <div className="card-meta">
                    <span className="views">
                      <i className="fas fa-eye"></i> {internship.views || 0}
                    </span>
                    <span className="applications">
                      <i className="fas fa-users"></i> {
                        applications.filter(app => app.internshipId === internship.id).length
                      }
                    </span>
                  </div>
                  <div className="card-actions">
                    <button
                      onClick={() => editInternship(internship)}
                      className="action-button edit"
                    >
                      <i className="fas fa-edit"></i> Edit
                    </button>
                    <button
                      onClick={() => toggleInternshipStatus(internship.id)}
                      className="action-button status"
                    >
                      {internship.status === 'active' ? (
                        <><i className="fas fa-pause"></i> Pause</>
                      ) : (
                        <><i className="fas fa-play"></i> Activate</>
                      )}
                    </button>
                    <button
                      onClick={() => deleteInternship(internship.id)}
                      className="action-button delete"
                    >
                      <i className="fas fa-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Applications Section */}
      {applications.length > 0 && (
        <section className="applications-section">
          <div className="section-header">
            <h2>Recent Applications</h2>
            <button className="view-all-button">
              View All Applications
            </button>
          </div>
          <div className="applications-list">
            {applications.slice(0, 3).map(application => (
              <div key={application.id} className="application-card">
                <div className="app-header">
                  <h4>{application.name}</h4>
                  <span className="app-status">{application.status}</span>
                </div>
                <div className="app-details">
                  <p>Applied for: {application.internshipPosition}</p>
                  <p>Email: {application.email}</p>
                  <p>Date: {new Date(application.date).toLocaleDateString()}</p>
                </div>
                <div className="app-actions">
                  <button className="app-button view">
                    <i className="fas fa-file-alt"></i> View CV
                  </button>
                  <button className="app-button contact">
                    <i className="fas fa-envelope"></i> Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
