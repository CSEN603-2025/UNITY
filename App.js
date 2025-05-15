import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StudentDashboard from './pages/StudentDashboard';
import ApplyPage from './pages/ApplyPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage' ;
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/applications" element={<ApplicationsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
