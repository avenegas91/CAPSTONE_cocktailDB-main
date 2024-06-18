import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import axiosCocktailDB from '../../utils/axiosCocktailDB';
import './PageStyles.css';
import { AuthContext } from '../../context/AuthContext';

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
    <div className="cocktail-container">
      <h1>My Favorites</h1>
      {cocktails.map(cocktail => (
        <div key={cocktail.idDrink} className="cocktail-details">
          <h2>{cocktail.strDrink}</h2>
          <img className="cocktail-image" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <h3>Ingredients</h3>
          <ul className="cocktail-ingredients">
            {Object.keys(cocktail)
              .filter((key) => key.startsWith('strIngredient') && cocktail[key])
              .map((key) => (
                <li key={key}>
                  {cocktail[key]} - {cocktail[`strMeasure${key.replace('strIngredient', '')}`]}
                </li>
              ))}
          </ul>
          <h3>Instructions</h3>
          <p className="cocktail-instructions">{cocktail.strInstructions}</p>
          {isAuthenticated && <button onClick={() => removeFromFavorites(cocktail.idDrink)}>Remove from Favorites</button>}
        </div>
      ))}
    </div>
  );
}

export default MyFavorites;
