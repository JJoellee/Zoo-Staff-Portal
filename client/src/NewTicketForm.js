import React, { useState } from 'react';
import './NewTicketForm.css';

const NewTicketForm = ({ onSubmit }) => {
  const [ticketData, setTicketData] = useState({
    tid: '',
    price: '',
    type: '',
    date_of_issuing: '',
    guide_ssn: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData({ ...ticketData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ticketData);
    setTicketData({
      tid: '',
      price: '',
      type: '',
      date_of_issuing: '',
      guide_ssn: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Issue a New Ticket</h2>
      <label htmlFor="tid">Ticket ID:</label>
      <input
        type="text"
        id="tid"
        name="tid"
        value={ticketData.tid}
        onChange={handleChange}
        required
      />
      <label htmlFor="price">Price:</label>
      <input
        type="number"
        id="price"
        name="price"
        value={ticketData.price}
        onChange={handleChange}
        required
      />
      <label htmlFor="type">Type:</label>
      <select name="type" value={ticketData.type} onChange={handleChange} required>
        <option value="">Select a type</option>
        <option value="Membership">Membership</option>
        <option value="Regular">Regular</option>
        <option value="VIP">VIP</option>
      </select>
      <label htmlFor="date_of_issuing">Date of Issuing:</label>
      <input
        type="date"
        id="date_of_issuing"
        name="date_of_issuing"
        value={ticketData.date_of_issuing}
        onChange={handleChange}
        required
      />
      <label htmlFor="guide_ssn">Guide SSN:</label>
      <input
        type="text"
        id="guide_ssn"
        name="guide_ssn"
        value={ticketData.guide_ssn}
        onChange={handleChange}
        required
      />
      <button type="submit">Issue Ticket</button>
    </form>
  );
};

export default NewTicketForm;
