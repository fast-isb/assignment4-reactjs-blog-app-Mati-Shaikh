import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const ProfileModal = ({ show, onClose, onUpdateProfile, onLogout }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Function to handle updating the profile
  const handleUpdateProfile = () => {
    const updatedFields = {
      username,
      password,
      email,
    };

    // Call the provided onUpdateProfile function
    onUpdateProfile(updatedFields);

    // Close the modal
    onClose();
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');

    // Call the provided onLogout function
    onLogout && onLogout();
    // Close the modal
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Form fields for updating profile */}
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your new username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateProfile}>
          Save Changes
        </Button>
        <Button variant="danger" onClick={handleLogout}>
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
