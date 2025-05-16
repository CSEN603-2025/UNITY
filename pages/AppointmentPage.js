import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function AppointmentPage() {
const [appointments, setAppointments] = useState([
{ id: 1, student: 'Ali GUC', topic: 'Internship help', status: 'pending' },
{ id: 2, student: 'Salma Z', topic: 'Report advice', status: 'pending' }
]);

const handleDecision = (id, status) => {
const updated = appointments.map(app => app.id === id ? { ...app, status } : app);
setAppointments(updated);
};

return (
<div style={{ display: 'flex' }}>
<Sidebar />
<div style={{ flex: 1 }}>
<Topbar />
<div style={{ padding: '20px' }}>
<h2>Appointments</h2>
{appointments.map(app => (
<div key={app.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
<p><strong>Student:</strong> {app.student}</p>
<p><strong>Topic:</strong> {app.topic}</p>
<p><strong>Status:</strong> {app.status}</p>
{app.status === 'pending' && (
<>
<button onClick={() => handleDecision(app.id, 'accepted')}>Accept</button>
<button onClick={() => handleDecision(app.id, 'rejected')}>Reject</button>
</>
)}
</div>
))}
</div>
</div>
</div>
);
}

export default AppointmentPage;