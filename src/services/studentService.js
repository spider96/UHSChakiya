import apiClient from '../api/apiClient';

export const getStudents = async () => {
  const res = await apiClient.get('/students');
    console.log("ll Students",res.data)
  return res.data;
};

export const addStudent = async student => {
  const res = await apiClient.post('/students', student);
  return res.data;
  
};
