import React, { useState } from 'react';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import './WelcomePageStyles.css';

function WelcomePage() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1 className="app-title">Barkeeps</h1>
        <p className="app-description">Discover and save your favorite cocktails. Create an account or log in to get started!</p>
        {showLogin ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
