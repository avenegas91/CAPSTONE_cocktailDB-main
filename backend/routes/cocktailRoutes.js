const express = require('express');
const { getRandomCocktail, searchCocktail } = require('../controllers/cocktailController');

const router = express.Router();

router.get('/random', getRandomCocktail);
router.get('/search/:name', searchCocktail);

module.exports = router;
