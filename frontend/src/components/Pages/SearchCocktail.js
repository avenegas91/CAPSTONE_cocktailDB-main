import React, { useState, useContext } from 'react';
import axiosCocktailDB from '../../utils/axiosCocktailDB';
import axios from 'axios';
import './PageStyles.css';
import { AuthContext } from '../../context/AuthContext';
import Cocktail from '../Cocktail';

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
        <Cocktail 
          cocktail={cocktail} 
          addToFavorites={addToFavorites}
          isAuthenticated={isAuthenticated}
        />
      )}
    </div>
  );
}

export default SearchCocktail;
