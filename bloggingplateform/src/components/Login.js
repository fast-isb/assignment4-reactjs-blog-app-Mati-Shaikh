// Login.js

import React, { useState } from 'react';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Response:', response);
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log(data.token)
        setErrorMessage(data.message || 'Login Success');
        onLoginSuccess(); // Trigger callback for successful login
        // ...
      } else {
        console.error('Login failed:', data.message);
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error during login. Please try again later.');
    }
  };
  

  return (
    <div className="login-container">
      <h2>Login</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
