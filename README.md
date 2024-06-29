WELCOME TO BARKEEPS!

API USED:  The CocktailDB  https://www.thecocktaildb.com/

Technologies Used:  NodeJS (backend), React JS (frontend), PostgreSQL (database) 

This application allows a user to create a profile in which they can search for and randmoly select cocktails from the cocktailDB API.  The search feature has an input bar with predictive text that narrows down the selections stored in The CocktailDB API when the user starts typing.  The Random Cocktail tab generates a random cocktail that the user can add to favorites, or they have the ability to generate another random cocktail by clicking the "Generate Another Random Cocktail" button.

The user will have the ability to add a cocktail to their favorites simply by clicking the "Add to Favorites" button.  The user is able to access all of their favorites through a favorites tab.  They also have the ability to delete off of their favorites as well by clicking the "Remove from Favorites" button.

There are 2 Tables in the database:  One for user login/register (username, password, birthdate) and one for adding cocktails to user's favorites.  The tables represent a One-to-Many relationship.  A single user can have many cocktails on their favorites page.  Crow's Foot notation is provided to show the relationship (Inputting birthdate was added after Crow's Foot Notation was completed).

To deploy on local machine:

Create database by seeding the data.sql file.

BACKEND (port 3000):

cd backend
nodemon index.js

FRONTEND (port 3001):

cd frontend
npm start

Enjoy!