// Tickets.js
import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import TicketList from './TicketList';
import ReceptionistDashboard from './ReceptionistDashboard';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loggedInReceptionist, setLoggedInReceptionist] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/tickets')
      .then((response) => response.json())
      .then((data) => setTickets(data));
  }, []);

  const handleLogin = (receptionist) => {
    setLoggedInReceptionist(receptionist);
    setShowLoginForm(false);
  };

  const handleIssueTicket = (ticket) => {
    fetch(`http://localhost:5000/api/receptionist/${loggedInReceptionist.ssn}/tickets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ticket),
    })
      .then((response) => response.json())
      .then((data) => {
        setTickets([...tickets, data]);
      });
  };

 

  const handleShowLoginForm = () => {
    setShowLoginForm(true);
  };

  return (
    <div>
      {loggedInReceptionist ? (
        <ReceptionistDashboard
          receptionist={loggedInReceptionist}
          onIssueTicket={handleIssueTicket}
        />
      ) : (
        <div>
          <h1>Tickets</h1>
          <TicketList tickets={tickets}  />
          {showLoginForm ? (
            <LoginForm onLoginSuccess={handleLogin} />
          ) : (
            <button onClick={handleShowLoginForm}>Issue Ticket</button>
          )}
        </div>
      )}
    </div>
  );
};



export default Tickets;
