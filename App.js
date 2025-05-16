import './App.css';
import Loginsignup from './loginsignup.jsx';
import Dashboard from './dashboard.jsx';
import Uploader from './uploader.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Notifications from './Notifications';
import ApplicationsList from './ApplicationsList.jsx';
import ApplicationDetails from './ApplicationDetails';
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
      status: "finalized",
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
    setApplications(prev => prev.map(app => 
      app.id === applicationId ? { ...app, status: newStatus } : app
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
        <Route path="/notifications" component={Notifications} />
        <Route exact path="/" component={Loginsignup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/uploader" component={Uploader} />
      </Switch>
    </Router>
  );
}

export default App;
