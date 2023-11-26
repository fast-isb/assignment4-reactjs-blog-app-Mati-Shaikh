// Blog_Modal.js

import React, { useState } from 'react';

const BlogModal = ({ onClose }) => {
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

      const response = await fetch('http://localhost:5001/api/posts/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        body: JSON.stringify({title:blogData.title,desc:blogData.desc}),
      });
      if(response.ok)
      {
        console.log("Request Fetched")
      }
      else
      {
        console.log("No Request Fetched")
      }
      console.log('Response from server:', response);
  
      if (response.ok) {
        console.log('Blog posted successfully');
        onClose();
      } else {
        console.error('Failed to post blog:', response.status, response.statusText);
  
        // Handle specific error cases
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
    <div className="blog-modal-container">
      <h2>Create Blog</h2>

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={blogData.title}
        onChange={handleChange}
      />

      <label htmlFor="desc">Description:</label>
      <textarea
        id="desc"
        name="desc"
        value={blogData.desc}
        onChange={handleChange}
      />

      {/* Add a button to trigger the post blog functionality */}
      <button onClick={handlePostBlog}>Post Blog</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default BlogModal;
