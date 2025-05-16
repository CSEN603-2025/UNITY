import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function ProStudentDashboard() {
return (
<div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f6f9' }}>
<Sidebar />
<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
<Topbar />
<div style={{ padding: '30px' }}>
<h1 style={{ marginBottom: '20px', color: '#2c3e50' }}>Pro Student Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <Card title="Applications Sent" value="12" />
        <Card title="Accepted Offers" value="4" />
        <Card title="Avg. Stipend" value="EGP 3200" />
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Upcoming Workshops</h3>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li>Resume Building 101 – June 1 @ 12:00 PM</li>
          <li>Interview Prep – June 2 @ 2:00 PM</li>
        </ul>
      </div>
    </div>
  </div>
</div>
);
}

function Card({ title, value }) {
return (
<div style={{
backgroundColor: '#fff',
padding: '20px',
borderRadius: '12px',
boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
width: '200px',
textAlign: 'center',
}}>
<h4 style={{ color: '#7f8c8d' }}>{title}</h4>
<p style={{ fontSize: '24px', fontWeight: 'bold', color: '#C8102E' }}>{value}</p>
</div>
);
}

const sectionStyle = {
backgroundColor: 'white',
padding: '20px',
borderRadius: '12px',
boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
};

const sectionTitleStyle = {
marginBottom: '10px',
fontSize: '18px',
fontWeight: '600',
color: '#2c3e50',
};

export default ProStudentDashboard;