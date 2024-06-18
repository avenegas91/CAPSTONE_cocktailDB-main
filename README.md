# CAPSTONE_cocktailDB

API USED:  The CocktailDB  https://www.thecocktaildb.com/

Technologies Used:  NodeJS (backend), React JS (frontend), PostgreSQL (database) 

This application allows a user to create a profile in which they can search for and randmoly select cocktails from the cocktailDB API.  The user will have the ability to add a cocktail to their favorites.  The user is able to access their favorites through a favorites tab.  They also have the ability to delete off of their favorites as well.

There are 2 Tables in the database:  One for user login/register (username, password) and one for adding cocktails to users favorites.  The tables represent a One-to-Many relationship.  A single user can have many cocktails on their favorites page.  Crow's Foot notation is provided to show the relationship.

To deploy on local machine:

Create database by seeding the data.sql file.

BACKEND (port 3000):
cd backend
nodemon index.js

FRONTEND (port 3001):
cd frontend
npm start

Still a work in progress...Enjoy!!! 🙂