import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import MyBlogs from './BlogsList'; // Import the BlogList component
//import './AdminDashboard.css'; // Import the stylesheet for AdminDashboard

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('section1');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/auth/getAllUsers');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/posts/getAllBlogs');
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (activeSection === 'section1') {
      fetchUsers();
    } else if (activeSection === 'section2') {
      fetchPosts();
    }
  }, [activeSection]);

  const disableUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/auth/disableUser/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to disable user');
      }
  
      // Update the state to reflect the disabled user
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? { ...user, disabled: true } : user))
      );
    } catch (error) {
      console.error('Error disabling user:', error);
    }
  };
  

  return (
    <div className="admin-dashboard-container">
      <nav className="admin-navbar">
        <h3>Admin Dashboard</h3>
        <div className="nav-links">
          <a href="#section1" onClick={() => setActiveSection('section1')}>
            View All Users
          </a>
          <a href="#section2" onClick={() => setActiveSection('section2')}>
            View All Posts
          </a>
        </div>
      </nav>

      <div className="admin-content">
        {activeSection === 'section1' && (
          <div id="section1" className="dashboard-section">
            <h2>View All Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id}>
                  <p>{user.username}</p>
                  <p>Email: {user.email}</p>
                  {!user.disabled && (
                    <button onClick={() => disableUser(user._id)} className="disable-button">
                      Disable
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'section2' && (
          <div id="section2" className="dashboard-section">
            <h2>View All Posts</h2>
            <MyBlogs /> {/* Render BlogList component for Admin Dashboard */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
