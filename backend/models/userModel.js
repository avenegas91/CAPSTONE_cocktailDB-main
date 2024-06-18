const { pool } = require('../config');

const createUser = async (username, hashedPassword) => {
  return pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [username, hashedPassword]);
};

const findUserByUsername = async (username) => {
  return pool.query('SELECT * FROM users WHERE username = $1', [username]);
};

module.exports = { createUser, findUserByUsername };
