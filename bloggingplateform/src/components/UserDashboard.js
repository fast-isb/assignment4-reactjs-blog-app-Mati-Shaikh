import React, { useState } from 'react';
import Navbar from './navbar';
import BlogList from './BlogsList';
import CreateBlogModal from './Blog_Modal';

const UserDashboard = ({ onLogout }) => {
  const [isCreateBlogModalOpen, setCreateBlogModalOpen] = useState(false);

  const openCreateBlogModal = () => {
    setCreateBlogModalOpen(true);
  };

  const closeCreateBlogModal = () => {
    setCreateBlogModalOpen(false);
  };

  return (
    <div className="user-dashboard-container">
      <Navbar onLogout={onLogout} />
      <main className="user-main-content">
        <button onClick={openCreateBlogModal}>Create Blog</button>
        <BlogList />
      </main>
      {isCreateBlogModalOpen && <CreateBlogModal onClose={closeCreateBlogModal} />}
    </div>
  );
};

export default UserDashboard;
