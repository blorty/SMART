import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Goals from './components/Goals';
import StressManagementActivities from './components/StressManagementActivities';
import RelaxationTechniques from './components/RelaxationTechniques';

import { Navbar } from './components/Navbar';

import './App.css';
import './index.css'

function App() {
  return (
    <Router>
      <Navbar onSectionChange={() => {}} NavbarBtnOpened={false} setNavbarBtnOpened={() => {}} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/stressmanagementactivities" element={<StressManagementActivities />} />
        <Route path="/relaxationtechniques" element={<RelaxationTechniques />} />
      </Routes>
    </Router>
  );
}

export default App;
