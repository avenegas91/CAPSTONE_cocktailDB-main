import React, { useState, useContext } from 'react';
import axiosCocktailDB from '../../utils/axiosCocktailDB';
import axios from 'axios';
import './SearchCocktailStyles.css';
import { AuthContext } from '../../context/AuthContext';
import Cocktail from '../Cocktail';
import '../CocktailStyles.css';

function SearchCocktail() {
  const [name, setName] = useState('');
  const [cocktail, setCocktail] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const { isAuthenticated } = useContext(AuthContext);

  const handleSearch = async (cocktailName) => {
    try {
      const response = await axiosCocktailDB.get(`/search.php?s=${cocktailName}`);
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
    handleSearch(suggestion.strDrink);
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
    <div className="search-cocktail-container">
      <h1 className="search-cocktail-title">Search Cocktail</h1>
      <input 
        type="text" 
        value={name} 
        onChange={handleChange} 
        placeholder="Search for a cocktail..." 
        className="search-cocktail-input"
      />
      {suggestions.length > 0 && (
        <ul className="search-suggestions-list">
          {suggestions.map((suggestion) => (
            <li 
              key={suggestion.idDrink} 
              onClick={() => handleSuggestionClick(suggestion)}
              className="search-suggestion-item"
            >
              {suggestion.strDrink}
            </li>
          ))}
        </ul>
      )}
      <button className="search-cocktail-button" onClick={() => handleSearch(name)}>Search</button>
      {cocktail && (
        <div className="cocktail-card">
          <Cocktail 
            cocktail={cocktail} 
            addToFavorites={addToFavorites}
            isAuthenticated={isAuthenticated}
          />
        </div>
      )}
    </div>
  );
}

export default SearchCocktail;
