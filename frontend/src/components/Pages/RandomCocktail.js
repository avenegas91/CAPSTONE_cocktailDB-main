import React, { useState, useEffect, useContext } from 'react';
import axiosCocktailDB from '../../utils/axiosCocktailDB';
import axios from 'axios';
import './PageStyles.css';
import { AuthContext } from '../../context/AuthContext';

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
        <div className="cocktail-details">
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
          {isAuthenticated && <button onClick={addToFavorites}>Add to Favorites</button>}
          <button onClick={fetchRandomCocktail}>Generate Another Random Cocktail</button>
        </div>
      )}
    </div>
  );
}

export default RandomCocktail;
