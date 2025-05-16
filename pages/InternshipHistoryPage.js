import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function InternshipHistoryPage() {
const [applications, setApplications] = useState([]);
const [search, setSearch] = useState('');

useEffect(() => {
const data = JSON.parse(localStorage.getItem('applications')) || [];
setApplications(data);
}, []);

const filtered = applications.filter(app =>
app.company.toLowerCase().includes(search.toLowerCase()) ||
app.position.toLowerCase().includes(search.toLowerCase())
);

return (
<div style={{ display: 'flex', height: '100vh' }}>
<Sidebar />
<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
<Topbar />
<div style={{ padding: '20px' }}>
<h1>Internship History</h1>
<input
type="text"
placeholder="Search by job title or company name"
value={search}
onChange={(e) => setSearch(e.target.value)}
style={{ marginBottom: '20px', padding: '8px', width: '300px' }}
/>
{filtered.length === 0 ? (
<p>No internships found.</p>
) : (
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
{filtered.map((item, index) => (
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
<h3>{item.company}</h3>
<p><strong>Position:</strong> {item.position}</p>
<p><strong>Duration:</strong> {item.duration}</p>
<p><strong>Status:</strong> {item.status}</p>
</div>
))}
</div>
)}
</div>
</div>
</div>
);
}

export default InternshipHistoryPage;