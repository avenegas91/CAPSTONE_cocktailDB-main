import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './CocktailStyles.css';

function Cocktail({ cocktail, addToFavorites }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const checkFavoriteStatus = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get('http://localhost:3000/favorites', {
            headers: { Authorization: token },
          });
          const favorites = response.data;
          const isFav = favorites.some(fav => fav.cocktail_id === cocktail.idDrink);
          setIsFavorite(isFav);
        } catch (error) {
          console.error('Failed to fetch favorites');
        }
      };

      checkFavoriteStatus();
    }
  }, [cocktail, isAuthenticated]);

  return (
    <div className="cocktail-card">
      <h2>{cocktail.strDrink}</h2>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
      <div className="cocktail-details">
        <h3>Ingredients</h3>
        <ul>
          {Object.keys(cocktail)
            .filter(key => key.startsWith('strIngredient') && cocktail[key])
            .map((key, index) => (
              <li key={index}>{cocktail[key]} - {cocktail[`strMeasure${key.match(/\d+/)[0]}`]}</li>
            ))}
        </ul>
        <h3>Instructions</h3>
        <p>{cocktail.strInstructions}</p>
        {isAuthenticated && (
          <button
            className={`favorites-button ${isFavorite ? 'disabled' : ''}`}
            onClick={!isFavorite ? addToFavorites : null}
            disabled={isFavorite}
          >
            {isFavorite ? 'Already in Favorites' : 'Add to Favorites'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Cocktail;
