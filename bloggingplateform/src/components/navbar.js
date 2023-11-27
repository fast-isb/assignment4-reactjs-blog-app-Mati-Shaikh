// Navbar.js
import React from 'react';
import './navbar.css';

const Navbar = ({ onProfileClick }) => {
  return (
    <div className="navbar-container">
      <div className="logo">
        <h3>
          <span>B</span>logging Platform
        </h3>
      </div>
      <div className="menu">
        <ul>
          <li>
            <a href="#">Home</a>
            <a href="#">MyBlogs</a>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div className="profile-icon" onClick={onProfileClick}>
        <button className="edit-profile-button">Profile</button>
      </div>
    </div>
  );
};

export default Navbar;
