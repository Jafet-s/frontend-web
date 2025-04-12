// src/services/api.ts
import axios from 'axios';
import { User, UserCreate, UserUpdate } from '../types';

const api = axios.create({
  baseURL: 'https://18.188.41.12:8000', // Cambiar por tu URL de backend local
});

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: (email: string, password: string) => 
    api.post('/login', { email, password }),
};

export const userService = {
    getAll: (): Promise<{ data: User[] }> => api.get('/users/'),
    create: (user: UserCreate): Promise<{ data: User }> => api.post('/users/', user),
    update: (id: number, user: UserUpdate): Promise<{ data: User }> => api.put(`/users/${id}`, user),
    delete: (id: number): Promise<void> => api.delete(`/users/${id}`),
  };

  

