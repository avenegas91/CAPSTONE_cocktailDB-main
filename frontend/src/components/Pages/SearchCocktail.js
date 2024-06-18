import React, { useState, useContext } from 'react';
import axiosCocktailDB from '../../utils/axiosCocktailDB';
import axios from 'axios';
import './PageStyles.css';
import { AuthContext } from '../../context/AuthContext';

function SearchCocktail() {
  const [name, setName] = useState('');
  const [cocktail, setCocktail] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  const handleSearch = async () => {
    try {
      const response = await axiosCocktailDB.get(`/search.php?s=${name}`);
      setCocktail(response.data.drinks ? response.data.drinks[0] : null);
      setSuggestions([]);  // Clear suggestions after search
    } catch (error) {
      alert('Failed to fetch cocktails');
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axiosCocktailDB.get(`/search.php?s=${query}`);
      setSuggestions(response.data.drinks ? response.data.drinks : []);
    } catch (error) {
      console.error('Failed to fetch suggestions');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setName(value);
    if (value.length > 1) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setName(suggestion.strDrink);
    setSuggestions([]);
    handleSearch();
  };

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
      <h1>Search Cocktail</h1>
      <input 
        type="text" 
        value={name} 
        onChange={handleChange} 
        placeholder="Search for a cocktail..." 
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((suggestion) => (
            <li 
              key={suggestion.idDrink} 
              onClick={() => handleSuggestionClick(suggestion)}
              className="suggestion-item"
            >
              {suggestion.strDrink}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSearch}>Search</button>
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
        </div>
      )}
    </div>
  );
}

export default SearchCocktail;
