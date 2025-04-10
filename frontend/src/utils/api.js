import axios from 'axios';
import { logout } from './auth';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend base URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      logout();
    }
    return Promise.reject(err);
  }
);

export default API;
