import apiClient from '../api/apiClient';

export const getStudents = async () => {
  const res = await apiClient.get('/students');
  return res.data;
};

export const addStudent = async student => {
  const res = await apiClient.post('/students', student);
  console.log("ll Students",res.data)
  return res.data;
  
};
