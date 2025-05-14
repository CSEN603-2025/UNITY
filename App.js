import './App.css';
import Loginsignup from './loginsignup.jsx';
import Dashboard from './dashboard.jsx';
import Uploader from './uploader.jsx';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Loginsignup} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/uploader" component={Uploader} />
      </Switch>
    </Router>
  );
}

export default App;