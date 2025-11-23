import axios from 'axios';

// Configuración inteligente:
// - En Producción (Railway): Usa la variable de entorno VITE_API_URL
// - En Desarrollo (Local): Usa '/api' para que el proxy de Vite redirija a localhost:3000
const baseURL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;