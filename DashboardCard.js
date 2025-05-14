import React from 'react';
import './DashboardCard.css';

function DashboardCard({ title, value, color }) {
  return (
    <div className="dashboard-card" style={{ borderLeft: `6px solid ${color}` }}>
      <h4 className="dashboard-card-title">{title}</h4>
      <p className="dashboard-card-value">{value}</p>
    </div>
  );
}

export default DashboardCard;
