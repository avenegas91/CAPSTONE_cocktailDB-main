const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const User = require('../models/userModel');

const register = async (req, res) => {
  const { username, password, birthdate } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    console.log('Register request:', { username, password, birthdate });

    // Check if the username already exists
    const existingUser = await User.findByUsername(username);
    console.log('Existing user:', existingUser);

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    const userId = await User.create(username, hashedPassword, birthdate);
    res.json({ userId });
  } catch (error) {
    console.error('Registration error:', error.message || error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findByUsername(username);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ userId: user.id }, secretKey);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error.message || error);
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
