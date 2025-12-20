import apiClient from '../api/apiClient';

export const loginApi = async (username, password) => {
  const res = await apiClient.post('/auth/login', { username, password });
  return res.data.token;
};
