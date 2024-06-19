import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './NavbarStyles.css';

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <ul>
        {isAuthenticated ? (
          <>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/search-cocktail">Search Cocktail</Link></li>
            <li><Link to="/random-cocktail">Find Random Cocktail</Link></li>
            <li><Link to="/my-favorites">My Favorites</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
