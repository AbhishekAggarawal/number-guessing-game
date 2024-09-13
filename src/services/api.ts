import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async (username: string, password: string) => {
  const response = await api.post('/auth/register', { username, password });
  return response.data;
};

export const saveScore = async (score: number) => {
  const response = await api.post('/scores', { score });
  return response.data;
};

export const getHighScore = async () => {
  const response = await api.get('/scores/high');
  return response.data.highScore;
};

export const getLeaderboard = async () => {
  const response = await api.get('/scores/leaderboard');
  return response.data;
};

export default api;