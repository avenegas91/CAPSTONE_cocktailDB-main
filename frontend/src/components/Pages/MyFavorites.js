import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import axiosCocktailDB from '../../utils/axiosCocktailDB';
import './MyFavoritesStyles.css';
import { AuthContext } from '../../context/AuthContext';
import Cocktail from '../Cocktail';
import '../CocktailStyles.css'; // Assuming this file contains the cocktail container styles

function MyFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [cocktails, setCocktails] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3000/favorites', {
          headers: { Authorization: token }
        });
        setFavorites(response.data);
      } catch (error) {
        alert('Failed to fetch favorites');
      }
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    const fetchCocktails = async () => {
      try {
        const cocktailsData = await Promise.all(
          favorites.map(async (favorite) => {
            const response = await axiosCocktailDB.get(`/lookup.php?i=${favorite.cocktail_id}`);
            return response.data.drinks[0];
          })
        );
        setCocktails(cocktailsData);
      } catch (error) {
        alert('Failed to fetch cocktail details');
      }
    };

    if (favorites.length > 0) {
      fetchCocktails();
    }
  }, [favorites]);

  const removeFromFavorites = async (cocktailId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:3000/favorites/${cocktailId}`, {
        headers: { Authorization: token }
      });
      setFavorites(favorites.filter(fav => fav.cocktail_id !== cocktailId));
      setCocktails(cocktails.filter(cocktail => cocktail.idDrink !== cocktailId));
    } catch (error) {
      alert('Failed to remove favorite');
    }
  };

  return (
    <div className="favorites-container">
      <h1 className="favorites-title">My Favorites</h1>
      <div className="favorites-grid">
        {cocktails.map(cocktail => (
          <div key={cocktail.idDrink} className="cocktail-card">
            <Cocktail 
              cocktail={cocktail} 
              isAuthenticated={isAuthenticated}
            />
            <button className="favorites-button" onClick={() => removeFromFavorites(cocktail.idDrink)}>Remove from Favorites</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyFavorites;
