import axios from 'axios';
import { getToken } from '../utils/storage';

const apiClient = axios.create({
  baseURL: 'http://10.0.2.2:8080/api', // change if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;