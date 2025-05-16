import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Topbar.css';


function Topbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const greeting = role === 'pro' ? 'Welcome, Pro Student' : 'Welcome, Student';

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="topbar">
      <h3 className="topbar-title">{greeting}</h3>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
}

export default Topbar;
