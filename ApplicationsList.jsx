import React from 'react';
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
        <h1>Applications Management</h1>
        <p>View and filter all internship applications</p>
      </div>

      <div className="applications-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search applicants or positions..."
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
              <option value="pending">Pending</option>
              <option value="finalized">Finalized</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
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

          <div className="filter-group">
            <label>Date Range</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
            >
              <option value="all">All Time</option>
              <option value="last7">Last 7 Days</option>
              <option value="last30">Last 30 Days</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>

          <button onClick={resetFilters} className="reset-filters">
            Reset Filters
          </button>
        </div>
      </div>

      <div className="applications-summary">
        <p>Showing <strong>{sortedApplications.length}</strong> of <strong>{applications.length}</strong> applications</p>
      </div>

      <div className="applications-list">
        {sortedApplications.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-file-alt"></i>
            <p>No applications found matching your criteria</p>
            <button onClick={resetFilters} className="reset-button">
              Reset Filters
            </button>
          </div>
        ) : (
          <table className="applications-table">
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Internship Position</th>
                <th>Status</th>
                <th>Applied On</th>
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
                    <td>{internship?.position || 'Position not found'}</td>
                    <td>
                      <select 
                        value={application.status}
                        onChange={(e) => handleStatusChange(application.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="finalized">Finalized</option>
                        <option value="accepted">Accepted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>
                    <td>{new Date(application.applicationDate).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleViewDetails(application.id)}
                        className="view-button"
                      >
                        View Details
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
