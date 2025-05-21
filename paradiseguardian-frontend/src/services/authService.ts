import api from './api';

export const login = async (credentials: { email: string; password: string }) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export const register = async (userData: { 
  email: string; 
  password: string; 
  name?: string; 
}) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
}; 