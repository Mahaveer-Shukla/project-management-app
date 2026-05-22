import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://project-management-app-production-1e8a.up.railway.app/api',
});

export default api;
