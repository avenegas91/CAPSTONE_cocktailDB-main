import React from 'react';
import './CocktailStyles.css';

const Cocktail = ({ cocktail, addToFavorites, isAuthenticated }) => {
  if (!cocktail) return null;

  return (
    <div>
      <h2 className="cocktail-title">{cocktail.strDrink}</h2>
      <img className="cocktail-image" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <h3 className="cocktail-subtitle">Ingredients</h3>
      <ul className="cocktail-ingredients">
        {Object.keys(cocktail)
          .filter((key) => key.startsWith('strIngredient') && cocktail[key])
          .map((key) => (
            <li key={key}>
              {cocktail[key]} - {cocktail[`strMeasure${key.replace('strIngredient', '')}`]}
            </li>
          ))}
      </ul>
      <h3 className="cocktail-subtitle">Instructions</h3>
      <p className="cocktail-instructions">{cocktail.strInstructions}</p>
      {isAuthenticated && addToFavorites && (
        <button className="cocktail-button" onClick={addToFavorites}>Add to Favorites</button>
      )}
    </div>
  );
};

export default Cocktail;
