import axios from 'axios';
import { getUser } from '../utils/storage';

const apiClient = axios.create({
  //baseURL: 'http://10.0.2.2:8080/api', // change if needed
  //baseURL: 'http://192.168.219.127:8080/api', // change if needed
 // baseURL: 'http://10.54.165.127:8080/api', // change if needed
   baseURL: 'http://192.168.31.227:8080/api', // change if needed
 // baseURL: 'http://192.168.1.2:8080/api', // change if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(async config => {
  const user = await getUser();
  const token = user?.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;