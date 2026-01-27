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
import { Calendar } from 'lucide-react-native';
import SubHeader from '../components/SubHeader';
import { getClasses, getStudentsByClass, markAttendance } from '../services/attendanceService';
import AttendanceStyles from '../style/AttendanceStyles';

export default function MarkAttendanceScreen({ onNavigate }) {
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showClassModal, setShowClassModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (selectedClass) {
      loadStudents();
    }
  }, [selectedClass]);

  const loadClasses = async () => {
    setIsLoading(true);
    try {
      const classList = await getClasses();
      setClasses(classList);
    } catch (error) {
      Alert.alert('Error', 'Failed to load classes');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStudents = async () => {
    setIsLoading(true);
    try {
      const studentList = await getStudentsByClass(selectedClass);
      setStudents(studentList);
      
      // Initialize attendance for new students
      const newAttendance = {};
      studentList.forEach(student => {
        if (!attendance[student.id]) {
          newAttendance[student.id] = 'Present';
        }
      });
      setAttendance(prev => ({ ...prev, ...newAttendance }));
    } catch (error) {
      Alert.alert('Error', 'Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatDateISO = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDateModal(false);
  };

  const updateAttendance = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleMarkAll = (status) => {
    const newAttendance = {};
    students.forEach(student => {
      newAttendance[student.id] = status;
    });
    setAttendance(newAttendance);
  };

  const validateAndSave = async () => {
    if (!selectedClass) {
      Alert.alert('Validation', 'Please select a class');
      return;
    }

    if (!selectedDate) {
      Alert.alert('Validation', 'Please select a date');
      return;
    }

    if (students.length === 0) {
      Alert.alert('Validation', 'No students in selected class');
      return;
    }

    setIsSaving(true);
    try {
      const attendanceData = students.map(student => ({
        studentId: student.id,
        status: attendance[student.id] || 'Present',
      }));

      await markAttendance(selectedClass, formatDateISO(selectedDate), attendanceData);
      Alert.alert('Success', 'Attendance marked successfully!', [
        {
          text: 'OK',
          onPress: () => onNavigate('HOME'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to mark attendance. Please try again.');
      console.error('Error marking attendance:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    onNavigate('HOME');
  };

  const renderClassItem = ({ item }) => (
    <TouchableOpacity
      style={AttendanceStyles.statItem}
      onPress={() => {
        setSelectedClass(item);
        setShowClassModal(false);
        setAttendance({});
      }}
    >
      <Text style={AttendanceStyles.statLabel}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={AttendanceStyles.container}>
      <SubHeader title="Mark Attendance" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={AttendanceStyles.scrollContainer}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={AttendanceStyles.scrollContentContainer}
        >
          {/* Selection Section */}
          <View style={AttendanceStyles.formCard}>
            <Text style={AttendanceStyles.sectionTitle}>Select Details</Text>

            {/* Class Selection */}
            <View style={AttendanceStyles.fieldGroup}>
              <Text style={AttendanceStyles.label}>Class *</Text>
              <TouchableOpacity
                style={AttendanceStyles.classSelector}
                onPress={() => setShowClassModal(true)}
              >
                <Text style={AttendanceStyles.classSelectorText}>
                  {selectedClass || 'Select a class'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Date Selection */}
            <View style={AttendanceStyles.fieldGroup}>
              <Text style={AttendanceStyles.label}>Date *</Text>
              <TouchableOpacity
                style={AttendanceStyles.dateDisplay}
                onPress={() => setShowDateModal(true)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Calendar size={16} color="#004a99" style={{ marginRight: 8 }} />
                  <Text style={AttendanceStyles.dateDisplayText}>
                    {formatDate(selectedDate)}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          {students.length > 0 && (
            <View style={AttendanceStyles.formCard}>
              <Text style={AttendanceStyles.sectionTitle}>Quick Actions</Text>
              <View style={AttendanceStyles.rowContainer}>
                <TouchableOpacity
                  style={[AttendanceStyles.button, { backgroundColor: '#27ae60' }]}
                  onPress={() => handleMarkAll('Present')}
                >
                  <Text style={AttendanceStyles.submitButtonText}>Mark All Present</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[AttendanceStyles.button, { backgroundColor: '#e74c3c' }]}
                  onPress={() => handleMarkAll('Absent')}
                >
                  <Text style={AttendanceStyles.submitButtonText}>Mark All Absent</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Students List */}
          {isLoading ? (
            <View style={AttendanceStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#004a99" />
              <Text style={AttendanceStyles.loadingText}>Loading students...</Text>
            </View>
          ) : students.length > 0 ? (
            <View style={AttendanceStyles.formCard}>
              <Text style={AttendanceStyles.sectionTitle}>Student Attendance</Text>
              <View style={AttendanceStyles.studentList}>
                {students.map((student, index) => (
                  <View key={student.id} style={AttendanceStyles.studentItem}>
                    <View style={AttendanceStyles.studentInfo}>
                      <Text style={AttendanceStyles.studentName}>
                        {student.rollNo}. {student.name}
                      </Text>
                      <Text style={AttendanceStyles.studentRoll}>
                        Roll No: {student.rollNo}
                      </Text>
                    </View>
                    <View style={AttendanceStyles.statusSelector}>
                      {['Present', 'Absent', 'Leave'].map(status => (
                        <TouchableOpacity
                          key={status}
                          style={[
                            AttendanceStyles.statusButton,
                            attendance[student.id] === status &&
                              AttendanceStyles.statusButtonActive,
                          ]}
                          onPress={() => updateAttendance(student.id, status)}
                        >
                          <Text
                            style={[
                              AttendanceStyles.statusButtonText,
                              attendance[student.id] === status &&
                                AttendanceStyles.statusButtonTextActive,
                            ]}
                          >
                            {status.slice(0, 3)}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : selectedClass ? (
            <View style={AttendanceStyles.emptyStateContainer}>
              <Text style={AttendanceStyles.emptyStateText}>
                No students found in {selectedClass}
              </Text>
            </View>
          ) : (
            <View style={AttendanceStyles.emptyStateContainer}>
              <Text style={AttendanceStyles.emptyStateText}>
                Select a class to view students
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          {students.length > 0 && (
            <View style={AttendanceStyles.buttonContainer}>
              <TouchableOpacity
                style={[AttendanceStyles.button, AttendanceStyles.cancelButton]}
                onPress={handleCancel}
                disabled={isSaving}
              >
                <Text style={AttendanceStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[AttendanceStyles.button, AttendanceStyles.submitButton]}
                onPress={validateAndSave}
                disabled={isSaving}
              >
                <Text style={AttendanceStyles.submitButtonText}>
                  {isSaving ? 'Saving...' : 'Save Attendance'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Class Selection Modal */}
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

      {/* Date Selection Modal */}
      <Modal
        transparent
        animationType="fade"
        visible={showDateModal}
        onRequestClose={() => setShowDateModal(false)}
      >
        <View style={AttendanceStyles.modalOverlay}>
          <View style={[AttendanceStyles.modalContent, { marginHorizontal: 20 }]}>
            <View style={AttendanceStyles.modalHeader}>
              <Text style={AttendanceStyles.modalTitle}>Select Date</Text>
              <TouchableOpacity
                style={AttendanceStyles.closeButton}
                onPress={() => setShowDateModal(false)}
              >
                <Text style={{ fontSize: 24, color: '#999' }}>✕</Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 16 }}>
              <View style={{ marginBottom: 16 }}>
                <Text style={AttendanceStyles.label}>
                  Current Date: {formatDate(selectedDate)}
                </Text>
              </View>
              <View style={AttendanceStyles.rowContainer}>
                <TouchableOpacity
                  style={[AttendanceStyles.button, AttendanceStyles.cancelButton]}
                  onPress={() => {
                    const today = new Date();
                    handleDateChange(today);
                  }}
                >
                  <Text style={AttendanceStyles.cancelButtonText}>Today</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[AttendanceStyles.button, AttendanceStyles.submitButton]}
                  onPress={() => {
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    handleDateChange(yesterday);
                  }}
                >
                  <Text style={AttendanceStyles.submitButtonText}>Yesterday</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
