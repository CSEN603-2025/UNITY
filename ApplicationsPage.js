import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';

function ApplicationsPage() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Topbar />
        <div style={{ padding: '20px' }}>
          <h1>My Applications</h1>
          <p>Coming soon...</p>
        </div>
      </div>
    </div>
  );
}

export default ApplicationsPage;
