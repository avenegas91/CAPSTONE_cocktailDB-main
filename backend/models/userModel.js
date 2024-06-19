const { pool } = require('../config');

const createUser = async (username, hashedPassword, birthdate) => {
  return pool.query('INSERT INTO users (username, password, birthdate) VALUES ($1, $2, $3) RETURNING id', [username, hashedPassword, birthdate]);
};

const findUserByUsername = async (username) => {
  return pool.query('SELECT * FROM users WHERE username = $1', [username]);
};

module.exports = { createUser, findUserByUsername };

