import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function ProfilePage() {
const [formData, setFormData] = useState({
name: '',
email: '',
role: '',
major: '',
semester: '',
interests: '',
internships: '',
partTimeJobs: '',
collegeActivities: ''
});

useEffect(() => {
const email = localStorage.getItem('email') || '';
const role = localStorage.getItem('role') || '';
const major = localStorage.getItem('major') || '';
const semester = localStorage.getItem('semester') || '';
const savedProfile = JSON.parse(localStorage.getItem('profile')) || {};
setFormData({
  name: email.split('@')[0],
  email,
  role,
  major,
  semester,
  interests: savedProfile.interests || '',
  internships: savedProfile.internships || '',
  partTimeJobs: savedProfile.partTimeJobs || '',
  collegeActivities: savedProfile.collegeActivities || ''
});
}, []);

const handleChange = (e) => {
setFormData(prev => ({
...prev,
[e.target.name]: e.target.value
}));
};

const handleSave = () => {
const profileData = {
interests: formData.interests,
internships: formData.internships,
partTimeJobs: formData.partTimeJobs,
collegeActivities: formData.collegeActivities
};
localStorage.setItem('profile', JSON.stringify(profileData));
alert('Profile updated!');
};

return (
<div style={{ display: 'flex', height: '100vh' }}>
<Sidebar />
<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
<Topbar />
<div style={{ padding: '20px', maxWidth: '600px' }}>
<h1>Profile</h1>
      <p><strong>Name:</strong> {formData.name}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Role:</strong> {formData.role === 'pro' ? 'Pro Student' : 'Student'}</p>
      <p><strong>Major:</strong> {formData.major}</p>
      <p><strong>Semester:</strong> {formData.semester}</p>

      <label>Job Interests</label>
      <textarea
        name="interests"
        value={formData.interests}
        onChange={handleChange}
        rows={2}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Previous Internships</label>
      <textarea
        name="internships"
        value={formData.internships}
        onChange={handleChange}
        rows={2}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>Part-time Jobs (Responsibilities, Duration, Company)</label>
      <textarea
        name="partTimeJobs"
        value={formData.partTimeJobs}
        onChange={handleChange}
        rows={2}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <label>College Activities</label>
      <textarea
        name="collegeActivities"
        value={formData.collegeActivities}
        onChange={handleChange}
        rows={2}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <button
        onClick={handleSave}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Save Changes
      </button>
    </div>
  </div>
</div>
);
}

export default ProfilePage;