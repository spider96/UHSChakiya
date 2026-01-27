import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
  Modal,
  FlatList,
} from 'react-native';
import SubHeader from '../components/SubHeader';
import {
  getClasses,
  getStudentsByClass,
  getStudentAttendance,
  getAllAttendance,
} from '../services/attendanceService';
import AttendanceStyles from '../style/AttendanceStyles';

export default function ViewAttendanceScreen({ onNavigate }) {
  const [filterType, setFilterType] = useState('class'); // class, student, date-range
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      const classList = await getClasses();
      setClasses(classList);
      
      // Load all students across classes
      let allStudents = [];
      for (const className of classList) {
        const classStudents = await getStudentsByClass(className);
        allStudents = [...allStudents, ...classStudents];
      }
      setStudents(allStudents);
    } catch (error) {
      Alert.alert('Error', 'Failed to load classes');
    }
  };

  const loadClassAttendance = async () => {
    if (!selectedClass) {
      Alert.alert('Validation', 'Please select a class');
      return;
    }

    setIsLoading(true);
    try {
      const allRecords = await getAllAttendance();
      const filtered = allRecords.filter(record => record.class === selectedClass);
      setAttendance(filtered);
    } catch (error) {
      Alert.alert('Error', 'Failed to load attendance');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStudentAttendance = async () => {
    if (!selectedStudent) {
      Alert.alert('Validation', 'Please select a student');
      return;
    }

    setIsLoading(true);
    try {
      const formatDateISO = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      };

      const records = await getStudentAttendance(
        selectedStudent.id,
        formatDateISO(startDate),
        formatDateISO(endDate)
      );
      setAttendance(records);
    } catch (error) {
      Alert.alert('Error', 'Failed to load attendance');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return AttendanceStyles.presentStatus;
      case 'Absent':
        return AttendanceStyles.absentStatus;
      case 'Leave':
        return AttendanceStyles.leaveStatus;
      default:
        return AttendanceStyles.notMarkedStatus;
    }
  };

  const handleLoadAttendance = () => {
    if (filterType === 'class') {
      loadClassAttendance();
    } else if (filterType === 'student') {
      loadStudentAttendance();
    }
  };

  const renderClassItem = ({ item }) => (
    <TouchableOpacity
      style={AttendanceStyles.statItem}
      onPress={() => {
        setSelectedClass(item);
        setShowClassModal(false);
      }}
    >
      <Text style={AttendanceStyles.statLabel}>{item}</Text>
    </TouchableOpacity>
  );

  const renderStudentItem = ({ item }) => (
    <TouchableOpacity
      style={AttendanceStyles.statItem}
      onPress={() => {
        setSelectedStudent(item);
        setShowStudentModal(false);
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={AttendanceStyles.statLabel}>{item.name}</Text>
        <Text style={[AttendanceStyles.statLabel, { fontSize: 10, marginTop: 2 }]}>
          {item.class} - Roll No: {item.rollNo}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={AttendanceStyles.container}>
      <SubHeader title="View Attendance" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={AttendanceStyles.scrollContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={AttendanceStyles.scrollContentContainer}
        >
          {/* Filter Type Selection */}
          <View style={AttendanceStyles.formCard}>
            <Text style={AttendanceStyles.sectionTitle}>Filter Type</Text>
            <View style={AttendanceStyles.rowContainer}>
              {['class', 'student'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    AttendanceStyles.button,
                    filterType === type
                      ? AttendanceStyles.submitButton
                      : AttendanceStyles.cancelButton,
                  ]}
                  onPress={() => {
                    setFilterType(type);
                    setAttendance([]);
                  }}
                >
                  <Text
                    style={
                      filterType === type
                        ? AttendanceStyles.submitButtonText
                        : AttendanceStyles.cancelButtonText
                    }
                  >
                    {type === 'class' ? 'By Class' : 'By Student'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Class Filter */}
          {filterType === 'class' && (
            <View style={AttendanceStyles.formCard}>
              <Text style={AttendanceStyles.sectionTitle}>Select Class</Text>
              <TouchableOpacity
                style={AttendanceStyles.classSelector}
                onPress={() => setShowClassModal(true)}
              >
                <Text style={AttendanceStyles.classSelectorText}>
                  {selectedClass || 'Select a class'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[AttendanceStyles.button, AttendanceStyles.submitButton]}
                onPress={handleLoadAttendance}
              >
                <Text style={AttendanceStyles.submitButtonText}>Load Attendance</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Student Filter */}
          {filterType === 'student' && (
            <View style={AttendanceStyles.formCard}>
              <Text style={AttendanceStyles.sectionTitle}>Select Student</Text>
              <TouchableOpacity
                style={AttendanceStyles.classSelector}
                onPress={() => setShowStudentModal(true)}
              >
                <Text style={AttendanceStyles.classSelectorText}>
                  {selectedStudent ? selectedStudent.name : 'Select a student'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[AttendanceStyles.button, AttendanceStyles.submitButton]}
                onPress={handleLoadAttendance}
              >
                <Text style={AttendanceStyles.submitButtonText}>Load Attendance</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Attendance Records */}
          {isLoading ? (
            <View style={AttendanceStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#004a99" />
              <Text style={AttendanceStyles.loadingText}>Loading attendance...</Text>
            </View>
          ) : attendance.length > 0 ? (
            <View style={AttendanceStyles.formCard}>
              <Text style={AttendanceStyles.sectionTitle}>
                Attendance Records ({attendance.length})
              </Text>
              <View style={AttendanceStyles.attendanceTable}>
                <View style={AttendanceStyles.tableHeader}>
                  <Text style={[AttendanceStyles.tableHeaderCell, { flex: 2 }]}>
                    {filterType === 'student' ? 'Date' : 'Student'}
                  </Text>
                  <Text style={AttendanceStyles.tableHeaderCell}>Status</Text>
                </View>
                {attendance.map((record, index) => (
                  <View
                    key={index}
                    style={[
                      AttendanceStyles.tableRow,
                      index === attendance.length - 1 && { borderBottomWidth: 0 },
                    ]}
                  >
                    <Text
                      style={[AttendanceStyles.tableCell, { flex: 2, textAlign: 'left' }]}
                    >
                      {filterType === 'student'
                        ? formatDate(record.date)
                        : `${record.studentId} - ${record.studentId}`}
                    </Text>
                    <Text
                      style={[AttendanceStyles.tableCell, getStatusColor(record.status)]}
                    >
                      {record.status}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <View style={AttendanceStyles.emptyStateContainer}>
              <Text style={AttendanceStyles.emptyStateText}>
                {attendance.length === 0 && (filterType === 'class' || filterType === 'student')
                  ? 'No attendance records found'
                  : 'Select a filter and click "Load Attendance"'}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={[AttendanceStyles.button, AttendanceStyles.cancelButton, { margin: 16 }]}
            onPress={() => onNavigate('HOME')}
          >
            <Text style={AttendanceStyles.cancelButtonText}>Back</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Class Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={showClassModal}
        onRequestClose={() => setShowClassModal(false)}
      >
        <View style={AttendanceStyles.modalOverlay}>
          <View style={AttendanceStyles.modalContent}>
            <View style={AttendanceStyles.modalHeader}>
              <Text style={AttendanceStyles.modalTitle}>Select Class</Text>
              <TouchableOpacity
                style={AttendanceStyles.closeButton}
                onPress={() => setShowClassModal(false)}
              >
                <Text style={{ fontSize: 24, color: '#999' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={classes}
              renderItem={renderClassItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              style={{ maxHeight: 400 }}
            />
          </View>
        </View>
      </Modal>

      {/* Student Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={showStudentModal}
        onRequestClose={() => setShowStudentModal(false)}
      >
        <View style={AttendanceStyles.modalOverlay}>
          <View style={AttendanceStyles.modalContent}>
            <View style={AttendanceStyles.modalHeader}>
              <Text style={AttendanceStyles.modalTitle}>Select Student</Text>
              <TouchableOpacity
                style={AttendanceStyles.closeButton}
                onPress={() => setShowStudentModal(false)}
              >
                <Text style={{ fontSize: 24, color: '#999' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={students}
              renderItem={renderStudentItem}
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={true}
              nestedScrollEnabled={true}
              style={{ maxHeight: 400 }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}
