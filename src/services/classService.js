// classService.js  (or wherever useSchoolClasses lives)

import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';   // ← adjust path
import apiClient from '../api/apiClient';

export default function useSchoolClasses() {
  const { user } = useContext(AuthContext);

  if (!user?.schoolId) {
    // You can throw, return empty functions, or handle gracefully
    console.warn("No schoolId found in auth context");
  }

  const schoolId = user?.schoolId || null;
  const baseUrl = schoolId ? `schools/${schoolId}/classes` : null;

  const getSchoolClasses = async () => {
    if (!baseUrl) throw new Error("Cannot fetch classes — no school selected");
    try {
      const res = await apiClient.get(baseUrl);
      return res.data || [];
    } catch (err) {
      console.error("getSchoolClasses failed:", err);
      throw err;
    }
  };

  const addSchoolClass = async (classData) => {
    if (!baseUrl) throw new Error("Cannot add class — no school selected");
    const res = await apiClient.post(baseUrl, classData);
    return res.data;
  };

  return { getSchoolClasses, addSchoolClass };
}