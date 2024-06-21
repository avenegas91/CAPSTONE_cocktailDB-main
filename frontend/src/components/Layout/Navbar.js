import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './NavbarStyles.css';

function Navbar() {
  const { logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/home">Home</Link>
      <Link to="/search-cocktail">Search Cocktail</Link>
      <Link to="/random-cocktail">Random Cocktail</Link>
      <Link to="/my-favorites">My Favorites</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
