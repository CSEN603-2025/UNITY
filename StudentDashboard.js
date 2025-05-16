import React from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import DashboardCard from '../components/DashboardCard';
import RecentActivity from '../components/RecentActivity';

function StudentDashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <Topbar />

        {/* Dashboard Body */}
        <div style={{ padding: '20px', backgroundColor: '#f5f5f5', flex: 1 }}>
          <h1 style={{ marginBottom: '20px' }}>Welcome, Student!</h1>

          {/* Dashboard Cards */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <DashboardCard
              title="Applications Submitted"
              value="3"
              color="#C8102E"
            />
            <DashboardCard
              title="Missing Submissions"
              value="1"
              color="#FFD100"
            />
            <DashboardCard
              title="Ongoing Internships"
              value="2"
              color="#4CAF50"
            />
            <DashboardCard
              title="Completed Internships"
              value="1"
              color="#2196F3"
            />
          </div>

          {/* Recent Activity */}
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
