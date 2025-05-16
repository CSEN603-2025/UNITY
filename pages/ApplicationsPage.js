import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function ApplicationsPage() {
const [applications, setApplications] = useState([]);

useEffect(() => {
const stored = JSON.parse(localStorage.getItem('applications')) || [];
setApplications(stored);
}, []);

return (
<div style={{ display: 'flex', height: '100vh' }}>
<Sidebar />
<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
<Topbar />
<div style={{ padding: '20px' }}>
<h1>My Applications</h1>
{applications.length === 0 ? (
<p>No applications submitted yet.</p>
) : (
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
{applications.map((app, index) => (
<div
key={index}
style={{
background: '#fff',
padding: '20px',
borderRadius: '8px',
boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
width: '300px',
}}
>
<h3>{app.company}</h3>
<p><strong>Position:</strong> {app.position}</p>
<p><strong>Duration:</strong> {app.duration}</p>
<p><strong>Student:</strong> {app.studentName}</p>
<p><strong>Notes:</strong> {app.notes || 'None'}</p>
<p><strong>Status:</strong> <span style={{ fontWeight: 'bold', color: getStatusColor(app.status) }}>{app.status}</span></p>
{app.resume && <p><strong>Resume:</strong> {app.resume}</p>}
{app.coverLetter && <p><strong>Cover Letter:</strong> {app.coverLetter}</p>}
{app.certificate && <p><strong>Certificate:</strong> {app.certificate}</p>}
</div>
))}
</div>
)}
</div>
</div>
</div>
);
}

function getStatusColor(status) {
switch (status) {
case 'pending': return '#f39c12';
case 'accepted': return '#2ecc71';
case 'rejected': return '#e74c3c';
case 'finalized': return '#3498db';
default: return '#333';
}
}

export default ApplicationsPage;