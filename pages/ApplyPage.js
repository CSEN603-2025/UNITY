import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const internships = [
  {
    id: 1,
    company: 'Vodafone',
    position: 'Software Intern',
    duration: '8 weeks',
    paid: true,
    stipend: 'EGP 3,000/month',
  },
  {
    id: 2,
    company: 'IBM',
    position: 'Cloud Intern',
    duration: '10 weeks',
    paid: false,
    stipend: null,
  },
  {
    id: 3,
    company: 'Valeo',
    position: 'Embedded Intern',
    duration: '6 weeks',
    paid: true,
    stipend: 'EGP 2,500/month',
  },
];

function ApplyPage() {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    notes: '',
    resume: null,
    certificate: null,
    coverLetter: null,
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    payment: '',
    company: '',
    duration: '',
  });

  const handleApplyClick = (internship) => {
    setSelected(internship);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const applications = JSON.parse(localStorage.getItem('applications')) || [];
    const newApplication = {
      ...selected,
      studentName: formData.studentName,
      notes: formData.notes,
      status: 'pending',
      resume: formData.resume?.name,
      certificate: formData.certificate?.name,
      coverLetter: formData.coverLetter?.name,
    };

    applications.push(newApplication);
    localStorage.setItem('applications', JSON.stringify(applications));

    alert(`Applied to ${selected.company} successfully!`);
    setSelected(null);
    setFormData({
      studentName: '',
      notes: '',
      resume: null,
      certificate: null,
      coverLetter: null,
    });
  };

  const filteredInternships = internships.filter((item) => {
    const matchesSearch =
      item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPayment =
      filters.payment === '' ||
      (filters.payment === 'paid' && item.paid) ||
      (filters.payment === 'unpaid' && !item.paid);

    const matchesCompany = filters.company === '' || item.company === filters.company;
    const matchesDuration = filters.duration === '' || item.duration === filters.duration;

    return matchesSearch && matchesPayment && matchesCompany && matchesDuration;
  });

  const uniqueCompanies = [...new Set(internships.map((i) => i.company))];
  const uniqueDurations = [...new Set(internships.map((i) => i.duration))];

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <div style={{ padding: '20px' }}>
          <h1>Available Internships</h1>

          {!selected && (
            <>
              <input
                type="text"
                placeholder="Search by company or position..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
              />

              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <select name="payment" value={filters.payment} onChange={handleFilterChange}>
                  <option value="">All Payments</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>

                <select name="company" value={filters.company} onChange={handleFilterChange}>
                  <option value="">All Companies</option>
                  {uniqueCompanies.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <select name="duration" value={filters.duration} onChange={handleFilterChange}>
                  <option value="">All Durations</option>
                  {uniqueDurations.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                {filteredInternships.length === 0 ? (
                  <p>No internships match your filters.</p>
                ) : (
                  filteredInternships.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: '#fff',
                        padding: '20px',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        width: '250px',
                      }}
                    >
                      <h3>{item.company}</h3>
                      <p><strong>Position:</strong> {item.position}</p>
                      <p><strong>Duration:</strong> {item.duration}</p>
                      <p><strong>Payment:</strong> {item.paid ? `Paid (${item.stipend})` : 'Unpaid'}</p>
                      <button
                        onClick={() => handleApplyClick(item)}
                        style={{
                          marginTop: '10px',
                          padding: '8px 16px',
                          backgroundColor: '#C8102E',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Apply
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {selected && (
            <div style={{ marginTop: '30px', maxWidth: '500px' }}>
              <h2>Apply to {selected.company}</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                  <label>Student Name</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label>Notes (optional)</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label>Upload Resume</label>
                  <input type="file" name="resume" accept=".pdf" onChange={handleChange} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label>Upload Certificate</label>
                  <input type="file" name="certificate" accept=".pdf" onChange={handleChange} />
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label>Upload Cover Letter</label>
                  <input type="file" name="coverLetter" accept=".pdf" onChange={handleChange} />
                </div>

                <button type="submit" style={btnStyle}>Submit Application</button>
                <button type="button" onClick={() => setSelected(null)} style={cancelStyle}>
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const btnStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  marginRight: '10px',
};

const cancelStyle = {
  padding: '10px 20px',
  backgroundColor: '#aaa',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default ApplyPage;
