import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogList = () => {
const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch data from the backend when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/posts/');
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {blogs.map(blog => (
          <li key={blog._id}>
            <h2>{blog.title}</h2>
            <p>{blog.desc}</p>
            <p>Author: {blog.author}</p>
            <p>Created At: {blog.createdAt}</p>
            {/* Add more details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlogList;