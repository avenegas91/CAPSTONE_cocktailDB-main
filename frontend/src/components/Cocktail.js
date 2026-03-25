import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './CocktailStyles.css';

function Cocktail({ cocktail, addToFavorites, isFavorite = false }) {
  const { isAuthenticated } = useContext(AuthContext);

  const ingredients = Object.keys(cocktail)
    .filter(key => key.startsWith('strIngredient') && cocktail[key])
    .map(key => {
      const num = key.match(/\d+/)[0];
      return { ingredient: cocktail[key], measure: cocktail[`strMeasure${num}`] };
    });

  return (
    <div className="cocktail-card">
      <h2>{cocktail.strDrink}</h2>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="cocktail-image" />
      <div className="cocktail-details">
        <h3>Ingredients</h3>
        <ul>
          {ingredients.map(({ ingredient, measure }, index) => (
            <li key={index}>{ingredient}{measure ? ` - ${measure}` : ''}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p>{cocktail.strInstructions}</p>
        {isAuthenticated && (
          <button
            className={`favorites-button ${isFavorite ? 'disabled' : ''}`}
            onClick={!isFavorite ? addToFavorites : undefined}
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