// src/context/NotificationsContext.js
import { createContext, useState, useContext, useEffect } from 'react';

const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const addNotification = (notification) => {
    setNotifications(prev => [{
      id: Date.now(),
      read: false,
      timestamp: new Date(),
      ...notification
    }, ...prev]);
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? {...n, read: true} : n)
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <NotificationsContext.Provider 
      value={{ 
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        clearAll
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationsContext);
