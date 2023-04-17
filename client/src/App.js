import React, { useState, createContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import Navbar from './Navbar';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Animals from './Animals';
import StaffMembers from './StaffMembers';
import Events from './Events';
import Tickets from './Tickets';
import Feedback from './Feedback';
import Login from './Login';

export const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUserSSN, setLoggedInUserSSN] = useState(null);
  const [isReceptionist, setIsReceptionist] = useState(false);

  const handleLogin = async (email, ssn) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, ssn }),
      });
  
      if (response.status === 200) {
        const data = await response.json();
        setIsAuthenticated(true);
        setLoggedInUserSSN(ssn);
        setIsReceptionist(data.isReceptionist);
      } else {
        alert('Invalid email or SSN');
      }
    } catch (error) {
      alert('Error while connecting to the server');
    }
  };  

  return (
    <AuthContext.Provider value={{ isAuthenticated, loggedInUserSSN }}>
      <Router>
        <div className="App">
        {isAuthenticated && <Navbar isReceptionist={isReceptionist} />}
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/animals" element={<Animals />} />
              <Route path="/staff-members" element={<StaffMembers />} />
              <Route path="/events" element={<Events />} />
              {isAuthenticated && isReceptionist && (
            <Route path="/tickets" element={<Tickets loggedInReceptionist={loggedInUserSSN}/>} />
          )}
              <Route path="/feedback" element={<Feedback loggedInUserSSN={loggedInUserSSN}/>} />
            </Routes>
          ) : (
            <Login onLogin={handleLogin} />
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
