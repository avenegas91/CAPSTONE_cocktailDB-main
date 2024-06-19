CREATE DATABASE cocktail_app;

\c cocktail_app

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  birthdate DATE NOT NULL
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  cocktail_id VARCHAR(100) NOT NULL
);
