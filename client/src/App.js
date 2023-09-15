import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';

//internal imports
import Home from './components/Home';
import About from './components/About';
import Account from './components/Account';
import Nav from './components/Nav';
import Login from './authentication/Login';
import Register from './authentication/Register';
import Goals from './components/Goals'
import Contact from './components/Contact';
import Chat from './components/Chat';

//context imports
import { useContext } from 'react';
import { AuthContext } from './authentication/UserContext';

function AuthorizedRoutes() {
  return (
    <Routes>
      
    </Routes>
  );
}

function UnauthorizedRoutes() {
  const {handleLogin} = useContext(AuthContext);
  
  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={(username, password) => handleLogin(username, password)} />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/account" element={<Account />} />
      <Route path="/goals" element={<Goals />} /> 
      <Route path="/contact-me" element={<Contact />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="App">
      <Nav />

      {user ? <AuthorizedRoutes /> : <UnauthorizedRoutes />}
    </div>
  );
}

export default App;
