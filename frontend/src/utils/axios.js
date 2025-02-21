import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Adjust based on your backend's URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
