import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarStyles.css';

function WelcomeNavbar() {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
}

export default WelcomeNavbar;
