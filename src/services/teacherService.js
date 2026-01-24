import apiClient from '../api/apiClient';

// Dummy data for testing - userId "shiv"
const DUMMY_TEACHER_DATA = {
  id: '1',
  userId: 'shiv',
  name: 'Shiv Kumar Singh',
  email: 'shiv.kumar@uhschakiya.edu.in',
  phone: '9876543210',
  dateOfBirth: '15/05/1985',
  gender: 'M',
  qualification: 'B.Ed, M.Sc',
  subject: 'Mathematics',
  department: 'Science',
  experience: '12',
  designation: 'Senior Teacher',
  alternatePhone: '9876543211',
  address: '123 Main Street, Chakiya, Bihar 804402',
  profileImage: null,
  active: true,
};

export const addTeacher = async (teacherData,schoold) => {
  try {
    const res = await apiClient.post('/user/create-teacher/'+`${schoold}`, {
      username: teacherData.username,
      name: teacherData.teacherName,
      emailId: teacherData.emailId,
      mobileNumber: teacherData.mobileNumber,
      password: teacherData.password,
      active: teacherData.active,
    });
    return res.data;
  } catch (error) {
    console.error('Error adding teacher:', error);
    throw error;
  }
};

export const getTeachers = async () => {
  try {
    const res = await apiClient.get('/teachers');
    return res.data;
  } catch (error) {
    console.error('Error fetching teachers:', error);
    throw error;
  }
};

export const getTeacherById = async (id) => {
  try {
    const res = await apiClient.get(`/teachers/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching teacher:', error);
    throw error;
  }
};

export const getTeacherByUserId = async (userId) => {
  try {
    // Return dummy data for testing with userId "shiv"
    if (userId === 'shiv') {
      console.log('Returning dummy teacher data for userId: shiv');
      return DUMMY_TEACHER_DATA;
    }

    const res = await apiClient.get(`/teachers/user/${userId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching teacher by user ID:', error);
    // Return null if teacher not found instead of throwing
    if (error.response?.status === 404) {
      return null;
    }
    throw error;
  }
};

export const updateTeacher = async (id, teacherData) => {
  try {
    // For dummy data testing, just return updated data
    if (id === '1') {
      console.log('Updating dummy teacher data:', teacherData);
      return {
        ...DUMMY_TEACHER_DATA,
        ...teacherData,
      };
    }

    const res = await apiClient.put(`/teachers/${id}`, {
      name: teacherData.name,
      dateOfBirth: teacherData.dateOfBirth,
      gender: teacherData.gender,
      qualification: teacherData.qualification,
      subject: teacherData.subject,
      department: teacherData.department,
      experience: teacherData.experience,
      designation: teacherData.designation,
      email: teacherData.email,
      phone: teacherData.phone,
      alternatePhone: teacherData.alternatePhone,
      address: teacherData.address,
    });
    return res.data;
  } catch (error) {
    console.error('Error updating teacher:', error);
    throw error;
  }
};

export const deleteTeacher = async (id) => {
  try {
    const res = await apiClient.delete(`/teachers/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting teacher:', error);
    throw error;
  }
};
