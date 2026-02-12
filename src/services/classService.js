// classService.js  (or wherever useSchoolClasses lives)

import { useCallback, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';   // ← adjust path
import apiClient from '../api/apiClient';

export default function useSchoolClasses() {
  const { user } = useContext(AuthContext);

  if (!user?.schoolId) {
    // You can throw, return empty functions, or handle gracefully
    console.warn("No schoolId found in auth context");
  }

  const schoolId = user?.schoolId || null;
  const baseUrl = schoolId ? `schools/${schoolId}/classes/active` : null;

  const getSchoolClasses = useCallback(async () => {
    if (!baseUrl) throw new Error("Cannot fetch classes — no school selected");
    try {
      const res = await apiClient.get(baseUrl);
      return res.data.data || [];
    } catch (err) {
      console.error("getSchoolClasses failed:", err);
      throw err;
    }
  }, [baseUrl]);

  const addSchoolClass = useCallback(async (classData) => {
    if (!baseUrl) throw new Error("Cannot add class — no school selected");
    const res = await apiClient.post(baseUrl, classData);
    return res.data;
  }, [baseUrl]);

  return { getSchoolClasses, addSchoolClass };
}
