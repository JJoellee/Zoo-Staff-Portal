import React, { useState } from 'react';
import './Feedback.css';

const Feedback= ({loggedInUserSSN}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: send feedback to backend
    setShowPopup(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <p>By SSN: {loggedInUserSSN}</p>

      <label htmlFor="subject">Subject:</label>
      <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} />

      <label htmlFor="message">Message:</label>
      <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

      <button type="submit">Submit</button>
    </form>
          {showPopup && (
            <div className="popup">
              <h3>Thank you for your feedback!</h3>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          )}
          </div>
  );
};

export default Feedback;
