import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './ApplicationsList.css';

const ApplicationsList = ({ applications = [], internships = [], onStatusChange }) => {
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    internship: 'all',
    dateRange: 'all',
    sortBy: 'newest'
  });

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicantName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      internships.find(i => i.id === app.internshipId)?.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || app.status === filters.status;
    const matchesInternship = filters.internship === 'all' || app.internshipId.toString() === filters.internship;
    const appDate = new Date(app.applicationDate);
    const now = new Date();
    let matchesDate = true;
    
    if (filters.dateRange === 'last7') {
      const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
      matchesDate = appDate >= sevenDaysAgo;
    } else if (filters.dateRange === 'last30') {
      const thirtyDaysAgo = new Date(now.setDate(now.getDate() - 30));
      matchesDate = appDate >= thirtyDaysAgo;
    }
    
    return matchesSearch && matchesStatus && matchesInternship && matchesDate;
  });

  const sortedApplications = [...filteredApplications].sort((a, b) => {
    const dateA = new Date(a.applicationDate);
    const dateB = new Date(b.applicationDate);
    return filters.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  const handleViewDetails = (applicationId) => {
    history.push(`/applications/${applicationId}`);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const resetFilters = () => {
    setFilters({
      status: 'all',
      internship: 'all',
      dateRange: 'all',
      sortBy: 'newest'
    });
    setSearchTerm('');
  };

  const handleStatusChange = (applicationId, newStatus) => {
    if (onStatusChange) {
      onStatusChange(applicationId, newStatus);
    }
  };

  return (
    <div className="applications-container">
      <div className="applications-header">
        <h1>Internship Management</h1>
        <p>Track current and completed interns</p>
      </div>

      <div className="applications-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search interns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="fas fa-search"></i>
        </div>

        <div className="filters-container">
          <div className="filter-group">
            <label>Status</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="current">Current Interns</option>
              <option value="completed">Completed Interns</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Internship</label>
            <select
              value={filters.internship}
              onChange={(e) => handleFilterChange('internship', e.target.value)}
            >
              <option value="all">All Internships</option>
              {internships.map(internship => (
                <option key={internship.id} value={internship.id}>
                  {internship.position}
                </option>
              ))}
            </select>
          </div>

          <button onClick={resetFilters} className="reset-filters">
            Reset Filters
          </button>
        </div>
      </div>

      <div className="applications-summary">
        <p>
          Showing <strong>{sortedApplications.length}</strong> interns
        </p>
      </div>

      <div className="applications-list">
        {sortedApplications.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-user-graduate"></i>
            <p>No interns found matching your criteria</p>
          </div>
        ) : (
          <table className="applications-table">
            <thead>
              <tr>
                <th>Intern</th>
                <th>Position</th>
                <th>Status</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Evaluation</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedApplications.map(application => {
                const internship = internships.find(i => i.id === application.internshipId);
                return (
                  <tr key={application.id}>
                    <td>
                      <div className="applicant-cell">
                        <div className="applicant-avatar">
                          {application.applicantName?.charAt(0) || 'A'}
                        </div>
                        {application.applicantName}
                      </div>
                    </td>
                    <td>{internship?.position || 'Unknown'}</td>
                    <td>
                      <span className={`status-badge ${application.status}`}>
                        {application.status}
                      </span>
                    </td>
                    <td>{application.startDate ? new Date(application.startDate).toLocaleDateString() : '-'}</td>
                    <td>{application.endDate ? new Date(application.endDate).toLocaleDateString() : '-'}</td>
                    <td>
                      {application.status === 'completed' ? (
                        application.evaluation ? (
                          <span className="evaluation-status completed">
                            <i className="fas fa-check-circle"></i> Evaluated
                          </span>
                        ) : (
                          <button 
                            onClick={() => history.push(`/evaluation/${application.id}`)}
                            className="evaluate-button"
                          >
                            Add Evaluation
                          </button>
                        )
                      ) : '-'}
                    </td>
                    <td>
                      <button 
                        onClick={() => handleViewDetails(application.id)}
                        className="view-button"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;
