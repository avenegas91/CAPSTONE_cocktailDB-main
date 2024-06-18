const { pool } = require('../config');

const addFavorite = async (userId, cocktailId) => {
  return pool.query('INSERT INTO favorites (user_id, cocktail_id) VALUES ($1, $2)', [userId, cocktailId]);
};

const getFavorites = async (userId) => {
  return pool.query('SELECT cocktail_id FROM favorites WHERE user_id = $1', [userId]);
};

const removeFavorite = async (userId, cocktailId) => {
  return pool.query('DELETE FROM favorites WHERE user_id = $1 AND cocktail_id = $2', [userId, cocktailId]);
};

module.exports = { addFavorite, getFavorites, removeFavorite };
