// studentService.js  (or e.g. hooks/useSchoolStudents.js)

import { useCallback, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';   // adjust path if needed
import apiClient from '../api/apiClient';

export default function useSchoolStudents() {
  const { user } = useContext(AuthContext);

  if (!user?.schoolId) {
    console.warn("No schoolId found in auth context");
  }

  const schoolId = user?.schoolId || null;
  const baseUrl = schoolId ? `students/${schoolId}` : null;

  const getStudents = useCallback(async () => {
    if (!baseUrl) {
      throw new Error("Cannot fetch students — no school selected");
    }

    try {
      const res = await apiClient.get(baseUrl);
      console.log("All Students:", res.data); // keeping your debug log
      return res.data.data || [];
    } catch (err) {
      console.error("getStudents failed:", err);
      throw err;
    }
  }, [baseUrl]);

  const addStudent = useCallback(async (studentData) => {
    if (!baseUrl) {
      throw new Error("Cannot add student — no school selected");
    }

    const res = await apiClient.post(baseUrl, studentData);
    return res.data;
  }, [baseUrl]);

  const updateStudent = useCallback(async (studentId, studentData) => {
    if (!baseUrl) {
      throw new Error("Cannot update student — no school selected");
    }

    if (!studentId) {
      throw new Error("Cannot update student — missing studentId");
    }

    try {
      const res = await apiClient.put(`${baseUrl}/${studentId}`, studentData);
      return res.data;
    } catch (err) {
      if (err?.response?.status !== 404) {
        throw err;
      }

      const fallbackRes = await apiClient.put(`students/${studentId}`, studentData);
      return fallbackRes.data;
    }
  }, [baseUrl]);

  return {
    getStudents,
    addStudent,
    updateStudent,
    // you can easily add more later: updateStudent, deleteStudent, getStudentById, ...
  };
}
