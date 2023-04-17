import React, { useState } from 'react';
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [ssn, setSsn] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onLogin function passed as prop from App component
    onLogin(email, ssn);
  };

  return (
    <div class="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          SSN:
          <input type="text" value={ssn} onChange={(e) => setSsn(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
