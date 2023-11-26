import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const BlogModal = ({ show, onClose }) => {
  const [blogData, setBlogData] = useState({
    title: '',
    desc: '',
  });

  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  const handlePostBlog = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Unauthorized access. No token found.');
        return;
      }

      console.log('Preparing to post blog:', blogData);

      const response = await fetch('http://localhost:5001/api/posts/createPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token,
        },
        body: JSON.stringify(blogData),
      });

      console.log('Response from server:', response);

      if (response.ok) {
        console.log('Blog posted successfully');
        onClose();
      } else {
        console.error('Failed to post blog:', response.status, response.statusText);
        if (response.status === 401) {
          // Unauthorized - redirect to login page
          console.error('Unauthorized access. Redirecting to login page.');
          // You can use a navigation library or window.location.href to redirect
        }
      }
    } catch (error) {
      console.error('Failed Posting', error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="title">
            <Form.Label>Title:</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={blogData.title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="desc">
            <Form.Label>Description:</Form.Label>
            <Form.Control
              as="textarea"
              name="desc"
              value={blogData.desc}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handlePostBlog}>
          Post Blog
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BlogModal;
