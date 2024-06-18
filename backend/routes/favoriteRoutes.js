const express = require('express');
const { addFavoriteCocktail, getFavoriteCocktails, removeFavoriteCocktail } = require('../controllers/favoriteController');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

router.post('/', authenticateToken, addFavoriteCocktail);
router.get('/', authenticateToken, getFavoriteCocktails);
router.delete('/:id', authenticateToken, removeFavoriteCocktail);

module.exports = router;
