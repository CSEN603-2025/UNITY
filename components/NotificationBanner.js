import React, { useEffect, useState } from 'react';
import { notifications } from '../data/notifications';

function NotificationBanner() {
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let index = 0;

    const rotateNotification = () => {
      setCurrent(notifications[index]);
      setVisible(true); // reset visibility
      index = (index + 1) % notifications.length;
    };

    rotateNotification(); // first time
    const interval = setInterval(rotateNotification, 7000); // rotate every 7 sec

    return () => clearInterval(interval);
  }, []);

  if (!current || !visible) return null;

  const getColor = (type) => {
    switch (type) {
      case 'cycle': return '#3498db';
      case 'report': return '#e67e22';
      case 'workshop': return '#27ae60';
      case 'chat': return '#9b59b6';
      default: return '#333';
    }
  };

  return (
    <div style={{
      backgroundColor: getColor(current.type),
      color: 'white',
      padding: '8px 16px',
      textAlign: 'center',
      fontWeight: 'bold',
      position: 'relative'
    }}>
      🔔 {current.message}
      <button
        onClick={() => setVisible(false)}
        style={{
          position: 'absolute',
          right: '10px',
          top: '5px',
          background: 'transparent',
          color: 'white',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        ✖
      </button>
    </div>
  );
}

export default NotificationBanner;
