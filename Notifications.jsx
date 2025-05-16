import React, { useState, useEffect } from 'react';
import './Notifications.css';

const Notifications = ({ applications, internships }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  // Simulate new application notifications
  useEffect(() => {
    const newApps = applications.filter(app => app.status === 'pending');
    setUnreadCount(newApps.length);
    
    const appNotifications = applications.map(app => {
      const internship = internships.find(i => i.id === app.internshipId);
      return {
        id: app.id,
        message: `New application for ${internship?.position || 'Internship'}`,
        applicant: app.applicantName,
        internshipId: app.internshipId,
        status: app.status,
        date: new Date(app.applicationDate),
        read: false
      };
    });
    
    setNotifications(appNotifications);
  }, [applications, internships]);

  const markAsRead = (id) => {
    setNotifications(notifs => 
      notifs.map(n => n.id === id ? {...n, read: true} : n)
    );
    setUnreadCount(prev => prev - 1);
  };

  return (
    <div className="notifications-panel">
      <div className="notifications-header">
        <h2>Applications</h2>
        {unreadCount > 0 && (
          <span className="unread-badge">{unreadCount}</span>
        )}
      </div>
      
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <p className="empty-notifications">No new applications</p>
        ) : (
          notifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <p className="notification-meta">
                  <span>{notification.applicant}</span>
                  <span>{notification.date.toLocaleDateString()}</span>
                </p>
              </div>
              <div className={`status-badge ${notification.status}`}>
                {notification.status}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
