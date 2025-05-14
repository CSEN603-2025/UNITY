import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">GUC Internship</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item"><Link to="/">Dashboard</Link></li>
        <li className="sidebar-item"><Link to="/apply">Apply</Link></li>
        <li className="sidebar-item"><Link to="/applications">My Applications</Link></li>
        <li className="sidebar-item"><Link to="/profile">Profile</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;
