import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

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
      {/* Banner space with animation */}
      <motion.div
        className="banner-space"
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'loop' }}
        style={{
          whiteSpace: 'nowrap', // Prevent text from wrapping
          overflow: 'hidden', // Hide overflowing content
        }}
      >
        {/* Add your banner content here */}
        <h1>We are here to help...</h1>
      </motion.div>

      <div className="nav-container">
        <ul className="left-links">
          {/* Navigation links with animation */}
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Link to="/">Home</Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Link to="/about">About</Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Link to="/goals">Goals</Link>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <Link to="/chat">Chat</Link>
          </motion.li>
        </ul>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span>&#9776;</span> Menu
        </button>
      </div>

      {/* Sidebar with animation */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
          className="sidebar"
          ref={sidebarRef}
          onMouseLeave={closeSidebarOnMouseLeave}
          initial={{ opacity: 0, x: 250 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 250 }}
        >
          <section>
            <h1 style={{ border: "2px solid black" }}>
              <Account />
            </h1>
          </section>
          <section>
            <ul>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <Link to="/register">Register</Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <Link to="/login">Login</Link>
              </motion.li>
              <motion.li
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
              >
                <Link to="/donate">Donate</Link>
              </motion.li>
              {/* Add more sidebar links as needed */}
            </ul>
          </section>
        </motion.div>
        
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
