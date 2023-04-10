// ReceptionistDashboard.js
import React, { useState, useEffect } from 'react';
import TicketList from './TicketList';
import NewTicketForm from './NewTicketForm';

const ReceptionistDashboard = ({ receptionist, onIssueTicket}) => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/receptionist/${receptionist.ssn}/tickets`);
        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error('Error fetching tickets:', err);
      }
    };
  
    fetchTickets();
  }, [receptionist.ssn]);
  
  const handleSubmit = (ticketData) => {
    onIssueTicket(ticketData);
  };

  const handleDelete = (tid) => {
    fetch(`http://localhost:5000/api/tickets/${tid}`, {
      method: 'DELETE'
    })
      .catch((err) => console.error('Error deleting ticket:', err));
  };

  return (
    <div>
      <h1>Receptionist Dashboard</h1>
      <p>
        Logged in as {receptionist.first_name} {receptionist.last_name}
      </p>
      <h2>Issued Tickets</h2>
      <TicketList tickets={tickets} onDeleteTicket={handleDelete}/>
      <NewTicketForm onSubmit={handleSubmit}/>
    </div>
  );
};

export default ReceptionistDashboard;
