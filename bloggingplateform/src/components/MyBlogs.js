import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const MyBlogs = () => {
  const [myBlogs, setMyBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedData, setUpdatedData] = useState({ title: '', desc: '' });

  // Fetch blogs authored by the user
  const fetchMyBlogs = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/posts/getAuthorBlogs', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      const data = await response.json();

      if (Array.isArray(data)) {
        setMyBlogs(data);
      } else {
        console.error('Invalid API response format:', data);
      }
    } catch (error) {
      console.error('Error fetching my blogs:', error);
    }
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
    setShowModal(true);
  };

  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleDeleteClick = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/posts/deletePost/${selectedBlog._id}`, {
        method: 'DELETE',
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert('Blog deleted successfully');
        fetchMyBlogs(); // Refresh the blogs after deletion
        closeModal();
      } else {
        console.error('Error deleting blog:', data);
        alert('Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setShowUpdateModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/posts/updatePost/${selectedBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token: localStorage.getItem('token'),
        },
        body: JSON.stringify({ updatedFields: updatedData }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Blog updated successfully');
        fetchMyBlogs(); // Refresh the blogs after update
        closeModal();
      } else {
        console.error('Error updating blog:', data);
        alert('Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog');
    }
  };

  return (
    <>
      <h1>My Blogs</h1>

      <ul className="blog-list">
        {myBlogs.map((blog) => (
          <li key={blog._id} className="blog-item">
            <h2>{blog.title}</h2>
            <p>{blog.desc}</p>
            <p className="author">
              <strong>Author:</strong> {blog.author}
            </p>
            <p className="createdAt">
              <strong>Created at:</strong> {blog.createdAt}
            </p>
            <div className="blog-actions">
              {/* See More button */}
              <Button variant="info" onClick={() => handleBlogClick(blog)}>
                See More
              </Button>
            </div>
          </li>
        ))}
      </ul>

      {selectedBlog && (
        <Modal show={showModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedBlog.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedBlog.desc}</p>
            <p>
              <strong>Author:</strong> {selectedBlog.author}
            </p>
            <p>
              <strong>Created at:</strong> {selectedBlog.createdAt}
            </p>
            <Button variant="success" onClick={handleUpdateClick}>
              Update
            </Button>
            <Button variant="danger" onClick={handleDeleteClick}>
              Delete
            </Button>
          </Modal.Body>
        </Modal>
      )}

      {selectedBlog && (
        <Modal show={showUpdateModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              <Form.Group controlId="updateTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter updated title"
                  name="title"
                  value={updatedData.title}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="updateDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter updated description"
                  name="desc"
                  value={updatedData.desc}
                  onChange={handleInputChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Update
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default MyBlogs;
