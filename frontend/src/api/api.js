import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api' });

export function setToken(token){
  if(token) API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete API.defaults.headers.common['Authorization'];
}

export default API;
