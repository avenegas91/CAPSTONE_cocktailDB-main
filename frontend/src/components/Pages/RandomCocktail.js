import React, { useState, useEffect, useContext } from 'react';
import axiosCocktailDB from '../../utils/axiosCocktailDB';
import axios from 'axios';
import './PageStyles.css';
import { AuthContext } from '../../context/AuthContext';
import Cocktail from '../Cocktail';

function RandomCocktail() {
  const [cocktail, setCocktail] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  const fetchRandomCocktail = async () => {
    try {
      const response = await axiosCocktailDB.get('/random.php');
      setCocktail(response.data.drinks[0]);
    } catch (error) {
      alert('Failed to fetch random cocktail');
    }
  };

  useEffect(() => {
    fetchRandomCocktail();
  }, []);

  const addToFavorites = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:3000/favorites', { cocktailId: cocktail.idDrink }, {
        headers: { Authorization: token }
      });
      alert('Added to favorites');
    } catch (error) {
      alert('Failed to add to favorites');
    }
  };

  return (
    <div className="cocktail-container">
      <h1>Random Cocktail</h1>
      {cocktail && (
        <>
          <Cocktail 
            cocktail={cocktail} 
            addToFavorites={addToFavorites}
            isAuthenticated={isAuthenticated}
          />
          <button onClick={fetchRandomCocktail}>Generate Another Random Cocktail</button>
        </>
      )}
    </div>
  );
}

export default RandomCocktail;
