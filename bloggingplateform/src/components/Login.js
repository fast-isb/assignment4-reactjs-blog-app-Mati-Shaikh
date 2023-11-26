import React, { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Login.css';
import AdminDashboard from './Admin'; // Import the AdminDashboard component

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminKey, setAdminKey] = useState('');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false); // New state variable

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
        console.log(data.token);
        setErrorMessage(data.message || 'Login Success');
        onLoginSuccess();

        // If the admin login is successful, set isAdminLoggedIn to true
        if (formData.username.toLowerCase() === 'admin') {
          setIsAdminLoggedIn(true);
        }
      } else {
        console.error('Login failed:', data.message);
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setErrorMessage('Error during login. Please try again later.');
    }
  };

  const handleAdminLinkClick = () => {
    setShowAdminModal(true);
  };

  const handleAdminKeySubmit = () => {
    // Check if the entered admin key is correct
    if (adminKey === 'admin') {
      // Set isAdminLoggedIn to true when the admin key is correct
      setIsAdminLoggedIn(true);
      // You can add further admin-related logic here
    } else {
      // Display an error message for an incorrect admin key
      setErrorMessage('Incorrect admin key. Please try again.');
    }
    setShowAdminModal(false);
  };

  // If isAdminLoggedIn is true, render the AdminDashboard component
  if (isAdminLoggedIn) {
    return <AdminDashboard />;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>

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

        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>

        <Link to="/signup" className="signup-link">
          Don't have an account? Sign Up
        </Link>

        <br />

        {/* Admin Link */}
        <span className="admin-link" onClick={handleAdminLinkClick}>
          Admin? Click here
        </span>
      </Form>

      {/* Admin Key Modal */}
      <Modal show={showAdminModal} onHide={() => setShowAdminModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Admin Key</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formAdminKey">
            <Form.Label>Admin Key:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Admin Key"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdminKeySubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
