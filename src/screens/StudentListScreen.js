import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  Image,
} from 'react-native';
import StudentListStyles from '../style/StudentListStyles';
import SubHeader from '../components/SubHeader';

// Dummy data
const DUMMY_STUDENTS = [
  {
    id: 1,
    name: 'Ahmed Ali',
    fatherName: 'Ali Khan',
    className: '10-A',
    rollNumber: '01',
    dateOfBirth: '2008-05-15',
    aadhar: '1234-5678-9012',
    bankAccount: '1001234567890',
  },
  {
    id: 2,
    name: 'Fatima Hassan',
    fatherName: 'Hassan Ahmed',
    className: '10-A',
    rollNumber: '02',
    dateOfBirth: '2008-08-22',
    aadhar: '2345-6789-0123',
    bankAccount: '1002345678901',
  },
  {
    id: 3,
    name: 'Muhammad Usman',
    fatherName: 'Usman Ali',
    className: '10-B',
    rollNumber: '03',
    dateOfBirth: '2008-03-10',
    aadhar: '3456-7890-1234',
    bankAccount: '1003456789012',
  },
  {
    id: 4,
    name: 'Aisha Khan',
    fatherName: 'Khan Malik',
    className: '10-A',
    rollNumber: '04',
    dateOfBirth: '2008-11-05',
    aadhar: '4567-8901-2345',
    bankAccount: '1004567890123',
  },
  {
    id: 5,
    name: 'Hassan Ibrahim',
    fatherName: 'Ibrahim Ali',
    className: '10-B',
    rollNumber: '05',
    dateOfBirth: '2008-07-18',
    aadhar: '5678-9012-3456',
    bankAccount: '1005678901234',
  },
  {
    id: 6,
    name: 'Mariam Hassan',
    fatherName: 'Hassan Ahmed',
    className: '10-C',
    rollNumber: '06',
    dateOfBirth: '2008-09-12',
    aadhar: '6789-0123-4567',
    bankAccount: '1006789012345',
  },
  {
    id: 7,
    name: 'Ali Raza',
    fatherName: 'Raza Khan',
    className: '10-B',
    rollNumber: '07',
    dateOfBirth: '2008-02-28',
    aadhar: '7890-1234-5678',
    bankAccount: '1007890123456',
  },
  {
    id: 8,
    name: 'Zainab Ali',
    fatherName: 'Ali Khan',
    className: '10-C',
    rollNumber: '08',
    dateOfBirth: '2008-06-14',
    aadhar: '8901-2345-6789',
    bankAccount: '1008901234567',
  },
];

export default function StudentListScreen({ onNavigate }) {
  const [filterClass, setFilterClass] = useState('');
  const [searchName, setSearchName] = useState('');
  const [students, setStudents] = useState(DUMMY_STUDENTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const classes = useMemo(() => {
    return [...new Set(DUMMY_STUDENTS.map(s => s.className))].sort();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      const matchClass = !filterClass || student.className === filterClass;
      const matchName =
        !searchName ||
        student.name.toLowerCase().includes(searchName.toLowerCase());
      return matchClass && matchName;
    });
  }, [students, filterClass, searchName]);

  const handleFilter = () => {
    // Filter is applied through useMemo, this can be used for additional logic
    console.log('Filtering by class:', filterClass, 'name:', searchName);
  };

  const handleReset = () => {
    setFilterClass('');
    setSearchName('');
  };

  const handleEdit = student => {
    Alert.alert(
      'Edit Student',
      `Editing ${student.name}`,
      [{ text: 'OK', onPress: () => console.log('Edit:', student) }]
    );
  };

  const handleDelete = student => {
    Alert.alert(
      'Delete Student',
      `Are you sure you want to delete ${student.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setStudents(students.filter(s => s.id !== student.id));
            Alert.alert('Success', 'Student deleted successfully');
          },
        },
      ]
    );
  };

  const openView = student => {
    setSelectedStudent(student);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStudent(null);
  };

  return (
    <View style={StudentListStyles.container}>
      {/* Header */}
      <SubHeader title="Students" />
      {/* <View style={StudentListStyles.header}>
        <Text style={StudentListStyles.headerTitle}>Students</Text>
        <Text style={StudentListStyles.headerSubtitle}>
          View and manage all students
        </Text>
      </View> */}

      {/* Content */}
      <ScrollView
        style={StudentListStyles.contentContainer}
        contentContainerStyle={StudentListStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Statistics */}
        <View style={StudentListStyles.statsContainer}>
          <View style={StudentListStyles.statBox}>
            <Text style={StudentListStyles.statNumber}>{students.length}</Text>
            <Text style={StudentListStyles.statLabel}>Total Students</Text>
          </View>
          <View style={StudentListStyles.statBox}>
            <Text style={StudentListStyles.statNumber}>{classes.length}</Text>
            <Text style={StudentListStyles.statLabel}>Classes</Text>
          </View>
          <View style={StudentListStyles.statBox}>
            <Text style={StudentListStyles.statNumber}>
              {filteredStudents.length}
            </Text>
            <Text style={StudentListStyles.statLabel}>Filtered</Text>
          </View>
        </View>
        {/* Student View Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={StudentListStyles.modalOverlay}>
            <View style={StudentListStyles.modalCard}>
              <View style={StudentListStyles.profileHeader}>
                <Image
                  source={{ uri: selectedStudent?.image || 'https://via.placeholder.com/84' }}
                  style={StudentListStyles.profileImage}
                />
                <View>
                  <Text style={StudentListStyles.profileName}>{selectedStudent?.name}</Text>
                  <Text style={{ color: '#666', fontSize: 12 }}>
                    {selectedStudent?.className} • Roll {selectedStudent?.rollNumber}
                  </Text>
                </View>
              </View>

              <View style={StudentListStyles.profileRow}>
                <Text style={StudentListStyles.profileLabel}>Father</Text>
                <Text style={StudentListStyles.profileValue}>{selectedStudent?.fatherName}</Text>
              </View>
              <View style={StudentListStyles.profileRow}>
                <Text style={StudentListStyles.profileLabel}>DOB</Text>
                <Text style={StudentListStyles.profileValue}>{selectedStudent?.dateOfBirth}</Text>
              </View>
              <View style={StudentListStyles.profileRow}>
                <Text style={StudentListStyles.profileLabel}>Aadhar</Text>
                <Text style={StudentListStyles.profileValue}>{selectedStudent?.aadhar}</Text>
              </View>
              <View style={StudentListStyles.profileRow}>
                <Text style={StudentListStyles.profileLabel}>Bank Account</Text>
                <Text style={StudentListStyles.profileValue}>{selectedStudent?.bankAccount}</Text>
              </View>

              <View style={StudentListStyles.modalActions}>
                <TouchableOpacity style={StudentListStyles.closeButton} onPress={closeModal}>
                  <Text style={StudentListStyles.closeButtonText}>Close</Text>
                </TouchableOpacity>
                <TouchableOpacity style={StudentListStyles.editButton} onPress={() => { closeModal(); handleEdit(selectedStudent); }}>
                  <Text style={StudentListStyles.editButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={StudentListStyles.deleteButton} onPress={() => { closeModal(); handleDelete(selectedStudent); }}>
                  <Text style={StudentListStyles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Filter Section */}
        <View style={StudentListStyles.filterSection}>
          <Text style={StudentListStyles.filterTitle}>🔍 Filters</Text>

          {/* Search by Name */}
          <View style={StudentListStyles.filterRow}>
            <TextInput
              style={[StudentListStyles.filterInput, { flex: 1 }]}
              placeholder="Search by name..."
              placeholderTextColor="#999"
              value={searchName}
              onChangeText={setSearchName}
            />
          </View>

          {/* Filter by Class */}
          <View style={StudentListStyles.filterRow}>
            <TextInput
              style={[StudentListStyles.filterInput, { flex: 1 }]}
              placeholder="Filter by class (e.g., 10-A)"
              placeholderTextColor="#999"
              value={filterClass}
              onChangeText={setFilterClass}
            />
            <TouchableOpacity
              style={StudentListStyles.filterButton}
              onPress={handleFilter}
            >
              <Text style={StudentListStyles.filterButtonText}>Filter</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={StudentListStyles.resetButton}
              onPress={handleReset}
            >
              <Text style={StudentListStyles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Class Selection */}
          <View>
            <Text
              style={{
                fontSize: 11,
                color: '#666',
                marginBottom: 8,
                fontWeight: '500',
              }}
            >
              Quick Select:
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
              }}
            >
              {classes.map(cls => (
                <TouchableOpacity
                  key={cls}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    backgroundColor:
                      filterClass === cls ? '#0A5ED7' : '#f0f0f0',
                    borderRadius: 6,
                  }}
                  onPress={() => setFilterClass(filterClass === cls ? '' : cls)}
                >
                  <Text
                    style={{
                      fontSize: 11,
                      fontWeight: '600',
                      color: filterClass === cls ? 'white' : '#333',
                    }}
                  >
                    {cls}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Table Section */}
        <View style={StudentListStyles.tableSection}>
          {filteredStudents.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={true}
              scrollIndicatorInsets={{ right: 1 }}
              style={StudentListStyles.horizontalScrollContainer}
              nestedScrollEnabled={true}
            >
              <View style={StudentListStyles.tableWrapper}>
                {/* Table Header */}
                <View style={StudentListStyles.tableHeader}>
                  <View style={[StudentListStyles.headerCell, { width: 120 }]}>
                    <Text style={StudentListStyles.headerCellText}>Name</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 80 }]}>
                    <Text style={StudentListStyles.headerCellText}>Class</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 60 }]}>
                    <Text style={StudentListStyles.headerCellText}>Roll</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 100 }]}>
                    <Text style={StudentListStyles.headerCellText}>Father</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 110 }]}>
                    <Text style={StudentListStyles.headerCellText}>Aadhar</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 130 }]}>
                    <Text style={StudentListStyles.headerCellText}>Bank Account</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 100 }]}>
                    <Text style={StudentListStyles.headerCellText}>Action</Text>
                  </View>
                </View>

                {/* Table Rows */}
                {filteredStudents.map((student, index) => (
                  <View
                    key={student.id}
                    style={[
                      StudentListStyles.tableRow,
                      index % 2 === 1 && StudentListStyles.tableRowAlternate,
                    ]}
                  >
                    <View style={[StudentListStyles.tableCell, { width: 120 }]}>
                      <Text
                        style={[
                          StudentListStyles.tableCellText,
                          StudentListStyles.tableCellBold,
                        ]}
                      >
                        {student.name}
                      </Text>
                    </View>
                    <View style={[StudentListStyles.tableCell, { width: 80 }]}>
                      <Text style={StudentListStyles.tableCellText}>
                        {student.className}
                      </Text>
                    </View>
                    <View style={[StudentListStyles.tableCell, { width: 60 }]}>
                      <Text style={StudentListStyles.tableCellText}>
                        {student.rollNumber}
                      </Text>
                    </View>
                    <View style={[StudentListStyles.tableCell, { width: 100 }]}>
                      <Text style={[StudentListStyles.tableCellText, { fontSize: 10 }]}>
                        {student.fatherName.split(' ')[0]}
                      </Text>
                    </View>
                    <View style={[StudentListStyles.tableCell, { width: 110 }]}>
                      <Text style={[StudentListStyles.tableCellText, { fontSize: 10 }]}>
                        {student.aadhar}
                      </Text>
                    </View>
                    <View style={[StudentListStyles.tableCell, { width: 130 }]}>
                      <Text style={[StudentListStyles.tableCellText, { fontSize: 9 }]}>
                        {student.bankAccount}
                      </Text>
                    </View>
                    <View style={[StudentListStyles.actionCell, { width: 140, marginLeft: 0 }]}>
                      <TouchableOpacity
                        style={StudentListStyles.editButton}
                        onPress={() => openView(student)}
                      >
                        <Text style={StudentListStyles.editButtonText}>View</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={StudentListStyles.editButton}
                        onPress={() => handleEdit(student)}
                      >
                        <Text style={StudentListStyles.editButtonText}>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={StudentListStyles.deleteButton}
                        onPress={() => handleDelete(student)}
                      >
                        <Text style={StudentListStyles.deleteButtonText}>Del</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <View style={StudentListStyles.emptyState}>
              <Text style={StudentListStyles.emptyStateText}>
                No students found
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
