import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Ajuste se necessário
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // <- importante para enviar cookies se backend usa autenticação via cookie
});

// Interceptor para adicionar o token às requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

/*const api = axios.create({
  baseURL: 'http://localhost:3011', // ou o IP/URL do seu backend
});

export default api;*/