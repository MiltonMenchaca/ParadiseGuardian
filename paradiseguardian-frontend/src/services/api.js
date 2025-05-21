import axios from 'axios';
import { refreshToken } from './autService';

// Crear instancia de axios con URL base
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Si el error es 401 (Unauthorized) y no hemos intentado refrescar el token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Intentar refrescar el token
        const newToken = await refreshToken();
        
        // Si se obtuvo un nuevo token, reintentar la petición original
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.error('Error al refrescar token:', refreshError);
        // Redirigir al login si no se puede refrescar el token
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Funciones para interactuar con la API
export const fetchLogs = () => {
  return api.get('/api/logs');
};

export const fetchLogsByDate = (startDate, endDate) => {
  return api.get(`/api/logs/range?start=${startDate}&end=${endDate}`);
};

export const fetchLogsBySeverity = (severity) => {
  return api.get(`/api/logs/severity/${severity}`);
};

export const fetchLogStats = () => {
  return api.get('/api/logs/stats');
};

export default api;