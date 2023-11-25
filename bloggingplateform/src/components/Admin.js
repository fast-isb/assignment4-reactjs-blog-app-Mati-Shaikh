import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('section1');
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/auth/admin/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/posts/admin/posts');
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

  return (
    <div className="admin-dashboard-container">
      <nav className="admin-navbar">
        <h3>Admin Dashboard</h3>
        <div className="nav-links">
          <a href="#section1" onClick={() => setActiveSection('section1')}>View All Users</a>
          <a href="#section2" onClick={() => setActiveSection('section2')}>View All Posts</a>
        </div>
      </nav>

      <div className="admin-content">
        {activeSection === 'section1' && (
          <div id="section1" className="dashboard-section">
            <h2>View All Users</h2>
            <ul>
              {users.map(user => (
                <li key={user._id}>
                  <p>{user.username}</p>
                  <p>Email: {user.email}</p>
                  {/* Add more user details as needed */}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeSection === 'section2' && (
          <div id="section2" className="dashboard-section">
            <h2>View All Posts</h2>
            <ul>
              {posts.map(post => (
                <li key={post._id}>
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                  {/* Add more post details as needed */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
