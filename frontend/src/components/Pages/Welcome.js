import React from 'react';
import WelcomeNavbar from '../Layout/WelcomeNavbar';


function Welcome() {
  return (
    <div className="welcome-container">
      <WelcomeNavbar />
      <div className="welcome-content">
        <h1>Welcome to the Cocktail App</h1>
        <p>Please log in or register to continue.</p>
      </div>
    </div>
  );
}

export default Welcome;
