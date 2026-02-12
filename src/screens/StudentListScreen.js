import React, { useState, useMemo, useEffect } from 'react';
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
import { getStudents } from '../services/studentService';
import { getImage } from '../services/MediaService';
import useSchoolStudents from '../services/studentService';

export default function StudentListScreen({ navigation }) {
  const [filterClass, setFilterClass] = useState('');
  const [searchName, setSearchName] = useState('');
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [dispImage, setDispImage] = useState(null);
  const { getStudents } = useSchoolStudents();



  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true);
      try {
        const response = await getStudents(); // API call
        setStudents(response || []);          // safe fallback
      } catch (error) {
        console.error('Failed to load students:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStudents();
  }, []);



  const classes = useMemo(() => {
    return [...new Set(students.map(s => s.className))].sort();
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

  const openView = async student => {
    setSelectedStudent(student);
    if (
      student?.image &&
      (student.image.endsWith('.jpg') ||
        student.image.endsWith('.png') ||
        student.image.endsWith('.jpeg'))
    ) {
      setDispImage(await getImage(student.image));
    }

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedStudent(null);
    setDispImage(null);
  };

  return (
    <View style={StudentListStyles.container}>
      {/* Header */}
      <SubHeader title="Students" />


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
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={StudentListStyles.profileHeader}>
                  <Image
                    source={{ uri: dispImage || 'https://via.placeholder.com/84' }}
                    style={StudentListStyles.profileImage}
                  />
                  <View>
                    <Text style={StudentListStyles.profileName}>{selectedStudent?.name}</Text>
                    <Text style={{ color: '#666', fontSize: 12 }}>
                      {selectedStudent?.className} • Roll {selectedStudent?.rollNumber}
                    </Text>
                  </View>
                </View>


                <View style={{
                  borderBottomWidth: 2,
                  borderBottomColor: '#3d3d3d', // blue line
                  paddingBottom: 4,
                  //alignSelf: 'flex-start'
                  paddingVertical: 16
                }}>
                  <Text style={{ color: '#007BFF', fontWeight: 'bold', fontSize: 16 }}>Personal Information</Text>
                </View>

                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Father</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.fatherName}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Mother</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.motherName}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>DOB</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.dateOfBirth}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Gender</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.gender}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Aadhar</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.isAadhar}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Aadhar Number</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.aadharNumber}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Social Category</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.socialCategory}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Religion</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.religion}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Mobile</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.mobileNumber}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Email</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.email
                  }</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Address</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.studentAddress
                  }</Text>
                </View>

                <View style={{
                  borderBottomWidth: 2,
                  borderBottomColor: '#3d3d3d', // blue line
                  paddingBottom: 4,
                  //alignSelf: 'flex-start'
                  paddingVertical: 16
                }}>
                  <Text style={{ color: '#007BFF', fontWeight: 'bold', fontSize: 16 }}>Academic Information</Text>
                </View>

                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>District</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.district}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Block</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.block}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>School</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.schoolName}</Text>
                </View>
                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Session</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.academicYear}</Text>
                </View>

                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Class</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.className}</Text>
                </View>

                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Section</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.section}</Text>
                </View>

                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Roll</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.rollNumber}</Text>
                </View>

                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Admission Number</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.admissionNumber}</Text>
                </View>


                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Admission Date</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.dateOfAdmission}</Text>
                </View>

                <View style={{
                  borderBottomWidth: 2,
                  borderBottomColor: '#3d3d3d', // blue line
                  paddingBottom: 4,
                  //alignSelf: 'flex-start'
                  paddingVertical: 16
                }}>
                  <Text style={{ color: '#007BFF', fontWeight: 'bold', fontSize: 16 }}>Banking Information</Text>
                </View>

                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Account Number</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.accountNo}</Text>
                </View>


                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Account Holer Name</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.accountHolderName}</Text>
                </View>


                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>Bank Name</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.studentBankName}</Text>
                </View>

                <View style={StudentListStyles.profileRow}>
                  <Text style={StudentListStyles.profileLabel}>IFSC</Text>
                  <Text style={StudentListStyles.profileValue}>{selectedStudent?.ifsc}</Text>
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
              </ScrollView>
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
              placeholder="Filter by class"
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
                  <View style={[StudentListStyles.headerCell, { width: 80 }]}>
                    <Text style={StudentListStyles.headerCellText}>Section</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 60 }]}>
                    <Text style={StudentListStyles.headerCellText}>Roll</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 100 }]}>
                    <Text style={StudentListStyles.headerCellText}>Father</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 100 }]}>
                    <Text style={StudentListStyles.headerCellText}>Date Of Birth</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 130 }]}>
                    <Text style={StudentListStyles.headerCellText}>Admission Number</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 130 }]}>
                    <Text style={StudentListStyles.headerCellText}>Admission Date</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 130 }]}>
                    <Text style={StudentListStyles.headerCellText}>Mobile Number</Text>
                  </View>
                  <View style={[StudentListStyles.headerCell, { width: 130 }]}>
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
                    <View style={[StudentListStyles.tableCell, { width: 80 }]}>
                      <Text style={StudentListStyles.tableCellText}>
                        {student.section}
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
                    <View style={[StudentListStyles.tableCell, { width: 100 }]}>
                      <Text style={[StudentListStyles.tableCellText, { fontSize: 10 }]}>
                        {student.dateOfBirth}
                      </Text>
                    </View>
                    <View style={[StudentListStyles.tableCell, { width: 130 }]}>
                      <Text style={[StudentListStyles.tableCellText, { fontSize: 9 }]}>
                        {student.admissionNumber}
                      </Text>
                    </View>
                    <View style={[StudentListStyles.tableCell, { width: 130 }]}>
                      <Text style={[StudentListStyles.tableCellText, { fontSize: 9 }]}>
                        {student.dateOfAdmission}
                      </Text>
                    </View>

                    <View style={[StudentListStyles.tableCell, { width: 130 }]}>
                      <Text style={[StudentListStyles.tableCellText, { fontSize: 9 }]}>
                        {student.mobileNumber}
                      </Text>
                    </View>

                    <View style={[StudentListStyles.actionCell, { width: 130, marginLeft: 0 }]}>
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
