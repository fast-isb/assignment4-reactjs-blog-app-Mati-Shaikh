// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './navbar.css';
import MyBlogs from './MyBlogs';

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
            <Link to="/">Home</Link>
            <Link to="/myblogs">MyBlogs</Link>
            <Link to="/contact">Contact</Link>
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
