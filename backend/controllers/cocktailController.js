// controllers/cocktailController.js
const axios = require('axios');

const apiBaseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

const getRandomCocktail = async (req, res) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/random.php`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch random cocktail' });
  }
};

const searchCocktail = async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(`${apiBaseUrl}/search.php?s=${name}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch cocktail' });
  }
};

module.exports = { getRandomCocktail, searchCocktail };
