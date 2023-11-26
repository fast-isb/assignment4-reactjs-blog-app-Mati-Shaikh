import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import { Button } from 'react-bootstrap';
import ProfileModal from './ProfileModal';
import CreateBlogModal from './Blog_Modal'; // Import the CreateBlogModal component
import BlogList from './BlogsList';

const UserDashboard = ({ onLogout }) => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCreateBlogModalOpen, setCreateBlogModalOpen] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const isAuthenticated = await new Promise((resolve) => setTimeout(() => resolve(true), 1000));
      setIsAuthenticated(isAuthenticated);
    };

    checkAuthentication();
  }, []);

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };

  const handleUpdateProfile = async (updatedFields) => {
    try {
      const userId = '656396e50674e2d54ab990c8';
      console.log(userId);

      const response = await fetch(`http://localhost:5001/api/users/updateUser/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          updatedFields,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log('Profile updated successfully:', data);
     
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const openCreateBlogModal = () => {
    setCreateBlogModalOpen(true);
  };

  const closeCreateBlogModal = () => {
    setCreateBlogModalOpen(false);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="user-dashboard-container">
      <Navbar onProfileClick={openProfileModal} />
      <main className="user-main-content">
        <Button variant="primary" className="create-blog-button" onClick={openCreateBlogModal}>
          Create Blog
        </Button>
        <BlogList />
      </main>
      <ProfileModal show={isProfileModalOpen} onClose={closeProfileModal} onUpdateProfile={handleUpdateProfile} />
      <CreateBlogModal show={isCreateBlogModalOpen} onClose={closeCreateBlogModal} />
    </div>
  );
};

export default UserDashboard;
