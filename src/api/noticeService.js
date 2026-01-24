import apiClient from './apiClient';

// Get all notices
export const getNotices = async () => {
  try {
    const res = await apiClient.get('/notices');
    return res.data;
  } catch (error) {
    console.error('Error fetching notices:', error);
    throw error;
  }
};

// Get a specific notice by ID
export const getNoticeById = async (id) => {
  try {
    const res = await apiClient.get(`/notices/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching notice:', error);
    throw error;
  }
};

// Create a new notice
export const createNotice = async (noticeData) => {
  try {
    const res = await apiClient.post('/notices', noticeData);
    return res.data;
  } catch (error) {
    console.error('Error creating notice:', error);
    throw error;
  }
};

// Update an existing notice
export const updateNotice = async (id, noticeData) => {
  try {
    const res = await apiClient.put(`/notices/${id}`, noticeData);
    return res.data;
  } catch (error) {
    console.error('Error updating notice:', error);
    throw error;
  }
};

// Delete a notice
export const deleteNotice = async (id) => {
  try {
    const res = await apiClient.delete(`/notices/${id}`);
    return res.data;
  } catch (error) {
    console.error('Error deleting notice:', error);
    throw error;
  }
};
