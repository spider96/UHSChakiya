import apiClient from '../api/apiClient';

export const getSchoolClasses = async (schoolId) => {
  // Use backticks `` and ${} to embed the variable
  const url = `schools/${schoolId}/classes`;
  
  try {
    const res = await apiClient.get(url);
    console.log("School classes", res.data);
    return res.data;
  } catch (error) {
    // The interceptor will handle the 401/403, 
    // but you should still log other errors here
    console.error("Error fetching school classes:", error);
    throw error;
  }
};

export const addSchoolClasses = async student => {
  const res = await apiClient.post('/students', student);
  return res.data;
  
};

