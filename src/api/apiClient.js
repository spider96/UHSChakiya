import axios from 'axios';
import { globalLogout } from '../auth/AuthContext';
import { getUser } from '../utils/storage';

const apiClient = axios.create({
  //baseURL: 'http://10.0.2.2:8080/api', // change if needed
  //baseURL: 'http://192.168.219.127:8080/api', // change if needed
 // baseURL: 'http://10.54.165.127:8080/api', // change if needed
   baseURL: 'http://192.168.31.229:8080/api', // change if needed
 // baseURL: 'http://192.168.1.2:8080/api', // change if needed
  headers: {
    'Content-Type': 'application/json',
  },
});


// REQUEST INTERCEPTOR: Adds token to every call
apiClient.interceptors.request.use(
  async (config) => {
    const user = await getUser();
    // Assuming your user object has a 'token' property
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If server says token is expired (401) or invalid (403)
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      
      // 1. Clear storage and state across the whole app
      //await globalLogout();
      await globalLogout('EXPIRED');
      
      // 2. Optional: Notify the user
    //  console.warn("Session expired, logging out...");
    }
    return Promise.reject(error);
  }
);

// apiClient.interceptors.request.use(async config => {
//   const user = await getUser();
//   const token = user?.token;

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default apiClient;