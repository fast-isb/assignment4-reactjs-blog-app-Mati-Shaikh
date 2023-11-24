// navbar.js

import React from 'react';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo">
        <h3>
          <span>B</span>logging Plateform
        </h3>
      </div>
      <div className="menu">
        <ul>
          <li>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>
      <div className="sign-buttons">
        <button>Login</button>
        <button>SignUp</button>
      </div>
    </div>
  );
};

export default Navbar;
