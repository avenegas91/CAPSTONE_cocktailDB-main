const express = require('express');
const { register, login } = require('../controllers/authController');
const validateSchema = require('../validateSchema');
const userSchema = require('../schemas/userSchema.json');

const router = express.Router();

router.post('/register', validateSchema(userSchema), register);
router.post('/login', login);

module.exports = router;
