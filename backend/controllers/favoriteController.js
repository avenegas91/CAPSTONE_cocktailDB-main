const { addFavorite, getFavorites, removeFavorite } = require('../models/favoriteModel');

const addFavoriteCocktail = async (req, res) => {
  const { cocktailId } = req.body;
  const userId = req.user.userId;
  try {
    await addFavorite(userId, cocktailId);
    res.status(201).json({ message: 'Favorite added' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add favorite' });
  }
};

const getFavoriteCocktails = async (req, res) => {
  const userId = req.user.userId;
  try {
    const result = await getFavorites(userId);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

const removeFavoriteCocktail = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  try {
    await removeFavorite(userId, id);
    res.status(200).json({ message: 'Favorite removed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to remove favorite' });
  }
};

module.exports = { addFavoriteCocktail, getFavoriteCocktails, removeFavoriteCocktail };
