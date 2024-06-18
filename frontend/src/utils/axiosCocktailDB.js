import axios from 'axios';

const axiosCocktailDB = axios.create({
  baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosCocktailDB;
