import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

const mockInternships = [
  {
    id: 1,
    company: 'Vodafone',
    position: 'Software Intern',
    duration: '8 weeks',
    paid: true, // <--- paid
    stipend: 'EGP 3,000/month',
  },
  {
    id: 2,
    company: 'IBM',
    position: 'Cloud Intern',
    duration: '10 weeks',
    paid: false, // <--- unpaid
    stipend: null,
  },
  {
    id: 3,
    company: 'Valeo',
    position: 'Embedded Intern',
    duration: '6 weeks',
    paid: true, // <--- paid
    stipend: 'EGP 2,500/month',
  },
];


function ApplyPage() {
  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({ studentName: '', notes: '' });

  const handleApplyClick = (internship) => {
    setSelected(internship);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Applied to ${selected.company} successfully!`);
    setSelected(null); // Reset form
    setFormData({ studentName: '', notes: '' });
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <div style={{ padding: '20px' }}>
          <h1>Available Internships</h1>

          {/* Step 1: Internship List */}
          {!selected && (
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {mockInternships.map((item) => (
                <div key={item.id} style={{
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  width: '250px'
                }}>
                  <h3>{item.company}</h3>
                  <p><strong>Position:</strong> {item.position}</p>
                  <p><strong>Duration:</strong> {item.duration}</p>
                  <p><strong>Payment:</strong> {item.paid ? `Paid (${item.stipend})` : 'Unpaid'}</p>

                  <button
                    style={{
                      marginTop: '10px',
                      padding: '8px 16px',
                      backgroundColor: '#C8102E',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer'
                    }}
                    onClick={() => handleApplyClick(item)}
                  >
                    Apply
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Step 2: Application Form */}
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
                    rows={4}
                    style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  style={{
                    marginLeft: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#aaa',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
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

export default ApplyPage;
