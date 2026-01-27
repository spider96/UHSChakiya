import apiClient from '../api/apiClient';

// Dummy data for development
const DUMMY_CLASSES = ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5'];

const DUMMY_STUDENTS = [
  { id: 1, name: 'Aarav Singh', rollNo: '001', class: 'Class 1' },
  { id: 2, name: 'Bhavna Sharma', rollNo: '002', class: 'Class 1' },
  { id: 3, name: 'Chirag Patel', rollNo: '003', class: 'Class 1' },
  { id: 4, name: 'Diya Verma', rollNo: '004', class: 'Class 2' },
  { id: 5, name: 'Eshan Kumar', rollNo: '005', class: 'Class 2' },
  { id: 6, name: 'Fatima Khan', rollNo: '006', class: 'Class 2' },
  { id: 7, name: 'Gaurav Singh', rollNo: '007', class: 'Class 3' },
  { id: 8, name: 'Harsh Malhotra', rollNo: '008', class: 'Class 3' },
];

// Store attendance records in memory (simulating database)
let attendanceRecords = [
  { id: 1, studentId: 1, date: '2024-01-20', status: 'Present', class: 'Class 1' },
  { id: 2, studentId: 2, date: '2024-01-20', status: 'Absent', class: 'Class 1' },
  { id: 3, studentId: 1, date: '2024-01-19', status: 'Present', class: 'Class 1' },
  { id: 4, studentId: 3, date: '2024-01-20', status: 'Present', class: 'Class 1' },
  { id: 5, studentId: 4, date: '2024-01-20', status: 'Present', class: 'Class 2' },
  { id: 6, studentId: 5, date: '2024-01-20', status: 'Absent', class: 'Class 2' },
];

// Get all classes
export const getClasses = async () => {
  try {
    // API call would be: const res = await apiClient.get('/classes');
    // For now using dummy data
    return DUMMY_CLASSES;
  } catch (error) {
    console.error('Error fetching classes:', error);
    return DUMMY_CLASSES;
  }
};

// Get students by class
export const getStudentsByClass = async (className) => {
  try {
    // API call: const res = await apiClient.get(`/students?class=${className}`);
    return DUMMY_STUDENTS.filter(student => student.class === className);
  } catch (error) {
    console.error('Error fetching students:', error);
    return DUMMY_STUDENTS.filter(student => student.class === className);
  }
};

// Mark attendance for multiple students
export const markAttendance = async (classname, date, attendanceData) => {
  try {
    // attendanceData format: [{ studentId, status: 'Present'|'Absent'|'Leave' }, ...]
    const newRecords = attendanceData.map((record, index) => ({
      id: attendanceRecords.length + index + 1,
      studentId: record.studentId,
      date,
      status: record.status,
      class: classname,
    }));
    
    // Remove existing records for this class and date
    attendanceRecords = attendanceRecords.filter(
      record => !(record.class === classname && record.date === date)
    );
    
    // Add new records
    attendanceRecords = [...attendanceRecords, ...newRecords];
    
    // API call would be: 
    // const res = await apiClient.post('/attendance/mark', {
    //   class: classname,
    //   date,
    //   records: attendanceData
    // });
    
    return { success: true, message: 'Attendance marked successfully' };
  } catch (error) {
    console.error('Error marking attendance:', error);
    throw error;
  }
};

// Get attendance by student
export const getStudentAttendance = async (studentId, startDate, endDate) => {
  try {
    // API call: 
    // const res = await apiClient.get(
    //   `/attendance/student/${studentId}?startDate=${startDate}&endDate=${endDate}`
    // );
    
    const records = attendanceRecords.filter(record => 
      record.studentId === studentId &&
      record.date >= startDate &&
      record.date <= endDate
    );
    
    return records;
  } catch (error) {
    console.error('Error fetching student attendance:', error);
    return [];
  }
};

// Get attendance by class
export const getClassAttendance = async (className, date) => {
  try {
    // API call:
    // const res = await apiClient.get(`/attendance/class/${className}?date=${date}`);
    
    const classStudents = DUMMY_STUDENTS.filter(s => s.class === className);
    const records = attendanceRecords.filter(record =>
      record.class === className && record.date === date
    );
    
    // Return with student details
    return classStudents.map(student => {
      const record = records.find(r => r.studentId === student.id);
      return {
        ...student,
        attendance: record?.status || 'Not Marked',
      };
    });
  } catch (error) {
    console.error('Error fetching class attendance:', error);
    return [];
  }
};

// Get class-wise attendance statistics
export const getClassWiseStats = async (month, year) => {
  try {
    // API call:
    // const res = await apiClient.get(
    //   `/attendance/stats/class?month=${month}&year=${year}`
    // );
    
    const stats = DUMMY_CLASSES.map(className => {
      const classStudents = DUMMY_STUDENTS.filter(s => s.class === className);
      const classRecords = attendanceRecords.filter(record => {
        const recordDate = new Date(record.date);
        return (
          record.class === className &&
          recordDate.getMonth() === month - 1 &&
          recordDate.getFullYear() === year
        );
      });
      
      const presentCount = classRecords.filter(r => r.status === 'Present').length;
      const totalRecords = classRecords.length;
      const percentage = totalRecords > 0 ? (presentCount / totalRecords * 100).toFixed(2) : 0;
      
      return {
        class: className,
        totalStudents: classStudents.length,
        totalRecords,
        presentCount,
        absentCount: classRecords.filter(r => r.status === 'Absent').length,
        leaveCount: classRecords.filter(r => r.status === 'Leave').length,
        percentage: parseFloat(percentage),
      };
    });
    
    return stats;
  } catch (error) {
    console.error('Error fetching class-wise stats:', error);
    return [];
  }
};

// Get month-wise attendance statistics for a class
export const getMonthWiseStats = async (className, year) => {
  try {
    // API call:
    // const res = await apiClient.get(
    //   `/attendance/stats/month?class=${className}&year=${year}`
    // );
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const stats = [];
    for (let month = 1; month <= 12; month++) {
      const classRecords = attendanceRecords.filter(record => {
        const recordDate = new Date(record.date);
        return (
          record.class === className &&
          recordDate.getMonth() === month - 1 &&
          recordDate.getFullYear() === year
        );
      });
      
      const presentCount = classRecords.filter(r => r.status === 'Present').length;
      const totalRecords = classRecords.length;
      const percentage = totalRecords > 0 ? (presentCount / totalRecords * 100).toFixed(2) : 0;
      
      stats.push({
        month: monthNames[month - 1],
        monthNumber: month,
        totalRecords,
        presentCount,
        absentCount: classRecords.filter(r => r.status === 'Absent').length,
        leaveCount: classRecords.filter(r => r.status === 'Leave').length,
        percentage: parseFloat(percentage),
      });
    }
    
    return stats;
  } catch (error) {
    console.error('Error fetching month-wise stats:', error);
    return [];
  }
};

// Get student-wise attendance statistics
export const getStudentWiseStats = async (className, month, year) => {
  try {
    // API call:
    // const res = await apiClient.get(
    //   `/attendance/stats/student?class=${className}&month=${month}&year=${year}`
    // );
    
    const classStudents = DUMMY_STUDENTS.filter(s => s.class === className);
    
    const stats = classStudents.map(student => {
      const studentRecords = attendanceRecords.filter(record => {
        const recordDate = new Date(record.date);
        return (
          record.studentId === student.id &&
          record.class === className &&
          recordDate.getMonth() === month - 1 &&
          recordDate.getFullYear() === year
        );
      });
      
      const presentCount = studentRecords.filter(r => r.status === 'Present').length;
      const totalRecords = studentRecords.length;
      const percentage = totalRecords > 0 ? (presentCount / totalRecords * 100).toFixed(2) : 0;
      
      return {
        ...student,
        totalRecords,
        presentCount,
        absentCount: studentRecords.filter(r => r.status === 'Absent').length,
        leaveCount: studentRecords.filter(r => r.status === 'Leave').length,
        percentage: parseFloat(percentage),
      };
    });
    
    return stats;
  } catch (error) {
    console.error('Error fetching student-wise stats:', error);
    return [];
  }
};

// Get all attendance records (for view/filter)
export const getAllAttendance = async () => {
  try {
    // API call: const res = await apiClient.get('/attendance');
    return attendanceRecords;
  } catch (error) {
    console.error('Error fetching all attendance:', error);
    return attendanceRecords;
  }
};
