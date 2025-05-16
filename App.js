
import './App.css';
import Loginsignup from './loginsignup.jsx';
import Dashboard from './dashboard.jsx';
import Uploader from './uploader.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Notifications from './Notifications';
import ApplicationsList from './ApplicationsList.jsx';
import ApplicationDetails from './ApplicationDetails';
import Evaluation from './Evaluation';
import { useState } from 'react';

function App() {
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicantName: "Alice Johnson",
      applicantEmail: "alice@example.com",
      internshipId: 101,
      status: "pending",
      applicationDate: "2023-05-10",
      education: {
        university: "State University",
        major: "Software Engineering",
        year: "Senior",
        gpa: "3.8"
      },
      experience: [
        {
          company: "Tech Corp",
          role: "Junior Developer",
          duration: "Summer 2022",
          description: "Worked on frontend development"
        }
      ],
      skills: ["React", "TypeScript", "UI/UX"],
      documents: [
        {
          name: "Alice_Johnson_CV.pdf",
          type: "cv",
          url: "#"
        }
      ]
    },
    {
      id: 2,
      applicantName: "Bob Smith",
      applicantEmail: "bob@example.com",
      internshipId: 102,
      status: "current",
      startDate: "2023-06-01",
      applicationDate: "2023-05-05",
      education: {
        university: "City College",
        major: "Computer Science",
        year: "Junior",
        gpa: "3.5"
      },
      skills: ["Python", "Django", "SQL"],
      documents: [
        {
          name: "Bob_Smith_Resume.pdf",
          type: "cv",
          url: "#"
        }
      ]
    },
    {
      id: 3,
      applicantName: "Sarah Williams",
      applicantEmail: "sarah@example.com",
      internshipId: 101,
      status: "completed",
      startDate: "2023-01-15",
      endDate: "2023-04-30",
      applicationDate: "2023-01-05",
      education: {
        university: "Tech Institute",
        major: "Computer Engineering",
        year: "Senior",
        gpa: "3.9"
      },
      evaluation: {
        performance: 4,
        skills: ["JavaScript", "React", "Teamwork"],
        strengths: "Excellent problem solver and quick learner",
        areasForImprovement: "Could improve documentation skills",
        recommendation: "hire",
        finalComments: "Sarah was a valuable team member and we would definitely hire her."
      },
      documents: [
        {
          name: "Sarah_W_Resume.pdf",
          type: "cv",
          url: "#"
        }
      ]
    }
  ]);

  const [internships, setInternships] = useState([
    {
      id: 101,
      position: "Frontend Developer Intern",
      type: "paid",
      duration: "3 months",
      status: "active"
    },
    {
      id: 102,
      position: "Backend Developer Intern",
      type: "paid",
      duration: "6 months",
      status: "active"
    }
  ]);

  const handleStatusChange = (applicationId, newStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === applicationId) {
        const updatedApp = { ...app, status: newStatus };
        if (newStatus === 'current') {
          updatedApp.startDate = new Date().toISOString().split('T')[0];
        } else if (newStatus === 'completed') {
          updatedApp.endDate = new Date().toISOString().split('T')[0];
        }
        return updatedApp;
      }
      return app;
    }));
  };

  const handleSaveEvaluation = (applicationId, evaluation) => {
    setApplications(prev => prev.map(app => 
      app.id === applicationId 
        ? { ...app, evaluation } 
        : app
    ));
  };

  return (
    <Router>
      <Switch>
        <Route path="/applications" exact>
          <ApplicationsList 
            applications={applications} 
            internships={internships}
            onStatusChange={handleStatusChange}
          />
        </Route>
        <Route path="/applications/:id">
          <ApplicationDetails 
            applications={applications} 
            internships={internships}
            onStatusChange={handleStatusChange}
          />
        </Route>
        <Route path="/evaluation/:id">
          <Evaluation 
            applications={applications}
            onSaveEvaluation={handleSaveEvaluation}
          />
        </Route>
        <Route path="/notifications" component={Notifications} />
        <Route exact path="/" component={Loginsignup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/uploader" component={Uploader} />
      </Switch>

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
import FrontRoleSelector from './pages/FrontRoleSelector';
function App() {
  return (
    <Router>
      <NotificationBanner /> {/* ✅ Outside of Routes */}
      <Routes>
        <Route path="/" element={<FrontRoleSelector />} />  
        <Route path="/login" element={<LoginPage />} />
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

