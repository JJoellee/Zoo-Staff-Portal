
import React, { useState, useEffect } from 'react';
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

function App() {

    return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/animals" element={<Animals />} />
            <Route path="/staff-members" element={<StaffMembers />} />
            <Route path="/events" element={<Events />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/feedback" element={<Feedback />} />
          </Routes>
        </div>
      </Router>
    );
  
    }
export default App;
