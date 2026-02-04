import axios from 'axios';

// Backend URL (Prilagoditi prema vašem okruženju)
const API_BASE_URL = 'http://localhost:8080/api/books';

// Kreiramo axios instancu
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor za greške
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
