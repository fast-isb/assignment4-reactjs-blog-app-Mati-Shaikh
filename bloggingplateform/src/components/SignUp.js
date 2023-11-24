import React, { useState } from 'react';
import './signUp.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('User registered successfully!');
        setErrorMessage('');
        console.log('User registered successfully:', data);
        // You can redirect or perform other actions upon successful registration
      } else {
        setSuccessMessage('');
        setErrorMessage(data.message || 'Registration failed. Please try again.');
        console.error('Registration failed:', data.message);
        // Handle registration failure, show error messages, etc.
      }
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error during registration. Please try again later.');
      console.error('Error during registration:', error);
      // Handle other errors, network issues, etc.
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Sign Up</h2>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />

      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
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

      <button onClick={handleSignUp}>Register</button>
    </div>
  );
};

export default SignUp;
