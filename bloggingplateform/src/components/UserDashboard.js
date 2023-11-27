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
      console.log(updatedFields)
      const userId = '6562347f0e1547ab79d2034e';
      console.log(userId);

      const response = await fetch(`http://localhost:5001/api/users/updateUser/${userId}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          token:localStorage.getItem('token')
        },
        body: JSON.stringify({
          userId,
          updatedFields,
        }),
      });
      const data = await response.json();
      console.log(data)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      

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
