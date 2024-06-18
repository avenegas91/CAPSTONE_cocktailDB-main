import axios from 'axios';

const instance = axios.create({
  baseURL: '/', // Use relative path
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
