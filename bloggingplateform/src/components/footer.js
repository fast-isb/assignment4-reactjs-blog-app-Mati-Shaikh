import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="social-icons">
        <FaTwitter className="icon" />
        <FaFacebook className="icon" />
        <FaInstagram className="icon" />
      </div>
      <div className="copyright">
        <p>&copy; 2023 Your Blog. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
