import React, { useState } from 'react';


const LoginForm = ({ onLoginSuccess }) => {
  const [ssn, setSsn] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5000/api/receptionist/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ssn, email }),
      });
  
      console.log('Response status:', response.status); // Add this line
  
      if (response.ok) {
        const data = await response.json();
        setError(null);
        onLoginSuccess(data);
      } else {
        setError('Login failed. Please check your SSN and email.');
      }
    } catch (err) {
      console.error('Error:', err); // Add this line
      setError('Login failed. Please check your SSN and email.');
    }
  };
  
  

  return (
    <div>
      <h2>Login as Receptionist</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="ssn">SSN:</label>
        <input
          type="text"
          id="ssn"
          value={ssn}
          onChange={(e) => setSsn(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LoginForm;
