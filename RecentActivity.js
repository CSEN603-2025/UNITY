import React from 'react';
import './RecentActivity.css';

const activityData = [
  {
    id: 1,
    message: 'You submitted an internship report for Siemens.',
    time: '2 days ago',
  },
  {
    id: 2,
    message: 'Your application for IBM was approved.',
    time: '5 days ago',
  },
  {
    id: 3,
    message: 'You applied for a new internship at Vodafone.',
    time: '1 week ago',
  },
];

function RecentActivity() {
  return (
    <div className="recent-activity">
      <h3 className="activity-title">Recent Activity</h3>
      <ul className="activity-list">
        {activityData.map((item) => (
          <li key={item.id} className="activity-item">
            <div className="activity-dot" />
            <div>
              <p className="activity-message">{item.message}</p>
              <p className="activity-time">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentActivity;
