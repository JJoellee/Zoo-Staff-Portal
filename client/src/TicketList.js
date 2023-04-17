import React from 'react';
import './TicketList.css';

const TicketList = ({ tickets, loggedInReceptionist, onDeleteTicket }) => {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>Price ($)</th>
              <th>Type</th>
              <th>Date of Issuing</th>
              <th>Receptionist Name</th>
              <th>Guide Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.tid}>
                <td>{ticket.tid}</td>
                <td>{ticket.price}</td>
                <td>{ticket.type}</td>
                <td>{ticket.date_of_issuing}</td>
                <td>{`${ticket.receptionist_first_name} ${ticket.receptionist_last_name}`}</td>
                <td>{`${ticket.guide_first_name} ${ticket.guide_last_name}`}</td>
                {onDeleteTicket && (
                  <td>
                    <button class="delete-btn" onClick={() => onDeleteTicket(ticket.tid)}>Delete</button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default TicketList;
