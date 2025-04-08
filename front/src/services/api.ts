import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3011', // ou o IP/URL do seu backend
});

export default api;