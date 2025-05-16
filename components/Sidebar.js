import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';


function Sidebar() {
  const role = localStorage.getItem('role');

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">GUC Internship</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="sidebar-item"><Link to="/apply">Apply</Link></li>
        <li className="sidebar-item"><Link to="/applications">My Applications</Link></li>
        <li className="sidebar-item"><Link to="/profile">Profile</Link></li>
        <li className="sidebar-item"><Link to="/history">Internship History</Link></li>
        <li className="sidebar-item"><Link to="/courses">Courses</Link></li> 
        <li className="sidebar-item"><Link to="/report">Report</Link></li> 
        <li className="sidebar-item"><Link to="/evaluation">Evaluation</Link></li> 
        <li className="sidebar-item"><Link to="/assessments">Assessments</Link></li> 
        <li className="sidebar-item"><Link to="/workshops">Workshops</Link></li>
        {role === 'pro' && (
          <li className="sidebar-item"><Link to="/pro-dashboard">Pro Dashboard</Link></li>
        
        )}
        {role === 'pro' && (
  
          <li className="sidebar-item"><Link to="/appointments">Appointments</Link></li>
          
        )}
        {role === 'pro' && (
        
           <li className="sidebar-item"><Link to="/workshops">Workshops</Link></li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
