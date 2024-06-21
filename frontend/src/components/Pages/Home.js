import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './Home.css';
import WelcomePage from './WelcomePage';

function Home() {
  const { isAuthenticated, username } = useContext(AuthContext);

  return (
    <div className="home-container">
      {isAuthenticated ? (
        <>
          <h1 className="home-title">Welcome to Barkeeps!</h1>
          <p className="home-description">Discover and save your favorite cocktails.</p>
          {username && <p className="username-display">Logged in as: {username}</p>}
        </>
      ) : (
        <div>
          <WelcomePage />
        </div>
      )}
    </div>
  );
}

export default Home;
