import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import Goals from './components/Goals/Goals';
import StressManagementActivities from './components/StressManagementActivities/StressManagementActivities';
import RelaxationTechniques from './components/RelaxationTechniques/RelaxationTechniques';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/goals" component={Goals} />
        <Route path="/stress-management-activities" component={StressManagementActivities} />
        <Route path="/relaxation-techniques" component={RelaxationTechniques} />
      </Switch>
    </Router>
  );
}

export default App;
