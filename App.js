import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import ApplyPage from './pages/ApplyPage';
import ApplicationsPage from './pages/ApplicationsPage';
import ProfilePage from './pages/ProfilePage';
import ProStudentDashboard from './pages/ProStudentDashboard';
import PrivateRoute from './components/PrivateRoute';
import InternshipHistoryPage from './pages/InternshipHistoryPage';
import ReportEditorPage from './pages/ReportEditorPage';
import EvaluationPage from './pages/EvaluationPage';
import CoursesPage from './pages/CoursesPage';
import AssessmentPage from './pages/AssessmentPage';
import WorkshopListPage from './pages/WorkshopListPage';
import AppointmentPage from './pages/AppointmentPage';
import NotificationBanner from './components/NotificationBanner';

function App() {
  return (
    <Router>
      <NotificationBanner /> {/* ✅ Outside of Routes */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
        <Route path="/apply" element={<PrivateRoute><ApplyPage /></PrivateRoute>} />
        <Route path="/applications" element={<PrivateRoute><ApplicationsPage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/pro-dashboard" element={<PrivateRoute><ProStudentDashboard /></PrivateRoute>} />
        <Route path="/history" element={<PrivateRoute><InternshipHistoryPage /></PrivateRoute>} />
        <Route path="/report" element={<PrivateRoute><ReportEditorPage /></PrivateRoute>} />
        <Route path="/evaluation" element={<PrivateRoute><EvaluationPage /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute><CoursesPage /></PrivateRoute>} />
        <Route path="/assessments" element={<PrivateRoute><AssessmentPage /></PrivateRoute>} />
        <Route path="/workshops" element={<PrivateRoute><WorkshopListPage /></PrivateRoute>} />
        <Route path="/appointments" element={<PrivateRoute><AppointmentPage /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
