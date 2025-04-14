import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const AUTH_URL = `${API_URL}/api/auth`;

export const registerUser = async (email, password) => {
  return await axios.post(`${AUTH_URL}/register`, { email, password });
};

export const loginUser = async (email, password) => {
  const response = await axios.post(`${AUTH_URL}/login`, { email, password });
  
  // Guardar tokens en localStorage
  if (response.data.accessToken) {
    localStorage.setItem('token', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
  }
  
  return response;
};

export const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await axios.post(`${AUTH_URL}/refresh-token`, { refreshToken });
    
    if (response.data.accessToken) {
      localStorage.setItem('token', response.data.accessToken);
      return response.data.accessToken;
    }
    
    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    // Si hay un error al refrescar el token, limpiar el almacenamiento
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return null;
  }
};
