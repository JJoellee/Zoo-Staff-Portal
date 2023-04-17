// Tickets.js
import React, { useState, useEffect } from 'react';
import TicketList from './TicketList';
import ReceptionistDashboard from './ReceptionistDashboard';

const Tickets = ({loggedInReceptionist}) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tickets')
      .then((response) => response.json())
      .then((data) => setTickets(data));
  }, []);

  const handleIssueTicket = (ticket) => {
    fetch(`http://localhost:5000/api/receptionist/${loggedInReceptionist}/tickets`, {
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

  return (
    <div>
        <ReceptionistDashboard
          receptionist={loggedInReceptionist}
          onIssueTicket={handleIssueTicket}
        />
    </div>
  );
};



export default Tickets;
