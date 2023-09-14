import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppProvider from './AppContext';

import Home from './components/Home';
import { Navbar } from './components/Navbar';

import './App.css';
import './index.css'

function App() {
  return (
    <AppProvider>
    <Router>
      <Navbar onSectionChange={() => {}} NavbarBtnOpened={false} setNavbarBtnOpened={() => {}} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
    </AppProvider>
  );
}

export default App;
