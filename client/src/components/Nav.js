import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Account from './Account';

const Navbar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnMouseLeave = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <nav>
      <div className="nav-container">
        <ul className="left-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span>&#9776;</span> Menu
        </button>
      </div>

      {isSidebarOpen && (
        <div className="sidebar" ref={sidebarRef} onMouseLeave={closeSidebarOnMouseLeave}>
        <h1><Account /></h1>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {/* Add more sidebar links as needed */}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
