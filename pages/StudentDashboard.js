import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function StudentDashboard() {
return (
<div style={{ display: 'flex', height: '100vh', backgroundColor: '#f4f6f9' }}>
<Sidebar />
<div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
<Topbar />
<div style={{ padding: '30px' }}>
<h1 style={{ marginBottom: '20px', color: '#2c3e50' }}>Student Dashboard</h1>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
        <Card title="My Applications" value="3 Active" />
        <Card title="Reports Submitted" value="1" />
        <Card title="Workshops Attended" value="2" />
      </div>

      <div style={sectionStyle}>
        <h3 style={sectionTitleStyle}>Upcoming Deadlines</h3>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li>Report final submission – May 30</li>
          <li>Appeal response window – June 2</li>
          <li>Resume Review Workshop – June 5</li>
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

export default StudentDashboard;