// SignUp.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import './signUp.css'; // Import the CSS file for styling

const SignUp = ({ onSignUpSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

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

      console.log('Response:', response);
      const data = await response.json();

      if (response.ok) {
        setErrorMessage(data.message || 'Signup Success');
        onSignUpSuccess();
        navigate('/login'); // Navigate back to the login page after successful signup
      } else {
        console.error('Signup failed:', data.message);
        setErrorMessage(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setErrorMessage('Error during signup. Please try again later.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" size="sm" onClick={handleSignUp}>
          Sign Up
        </Button>

        <Link to="/login" className="login-link">
          Already have an account? Log In
        </Link>
      </Form>
    </div>
  );
};

export default SignUp;
