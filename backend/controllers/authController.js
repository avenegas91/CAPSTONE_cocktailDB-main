const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const { createUser, findUserByUsername } = require('../models/userModel');

const register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const result = await createUser(username, hashedPassword);
    res.json({ userId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ error: 'User registration failed' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await findUserByUsername(username);
    if (result.rows.length === 0) return res.status(400).json({ error: 'User not found' });

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ userId: user.id }, secretKey);
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
};

module.exports = { register, login };
