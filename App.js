import './App.css';
import Loginsignup from './loginsignup.jsx';
import Dashboard from './dashboard.jsx';
import Uploader from './uploader.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Notifications from './Notifications';
import ApplicationsList from './ApplicationsList.jsx';
import ApplicationDetails from './ApplicationDetails';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/applications" exact component={ApplicationsList} />
        <Route path="/applications/:id" component={ApplicationDetails} />
        <Route path="/notifications" component={Notifications} />
        <Route exact path="/" component={Loginsignup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/uploader" component={Uploader} />
      </Switch>
    </Router>
  );
}

export default App;
