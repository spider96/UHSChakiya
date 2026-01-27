import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';

import { addStudent } from '../services/studentService';
import AddStudentStyles from '../style/AddStudentStyles';
import SubHeader from '../components/SubHeader';
import DropdownComponent from '../components/Dropdown';
import { getImage } from '../services/MediaService';
import { handleImageUpload } from '../utils/utils';
import { getSchoolClasses } from '../services/classService';
import DatePickerInput from '../components/DatePickerInput';

import { Import } from 'lucide-react-native';

export default function AddStudentScreen({ navigation }) {

  const hideDatePicker = () => setDatePickerVisibility(false);

  const [student, setStudent] = useState({
    schoolId: 1,
    //personal    
    isAadhar: true,
    aadharNumber: '',
    image: null,
    name: '',
    dateOfBirth: '',
    fatherName: '',
    motherName: '',
    gender: '',
    socialCategory: '',
    religion: '',
    studentAddress: '',
    mobileNumber: '',
    email: '',
    //educational
    session: '',
    district: '',
    block: '',
    school: 'U',
    schoolName: '',
    schoolClassId: '',
    className: '',
    section: '',
    admissionNumber: '',
    dateOfAdmission: '',
    rollNumber: '',
    //finantial
    accountNo: '',
    accountHolderName: '',
    studentBankName: '',
    ifsc: '',
    // status
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [studentImage, setStudentImage] = useState(null);
  const [schoolClasses, setschoolClasses] = useState(null)
  const [sessions, setSessions] = useState([]);
  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);



  useEffect(() => {
    const loadSchoolClasses = async () => {
      setLoading(true);
      try {
        const response = await getSchoolClasses(2); // API call
        setschoolClasses(response || []);          // safe fallback
      } catch (error) {
        console.error('Failed to load students:', error);
      } finally {
        setLoading(false);
      }
    };
    loadSchoolClasses();
  }, []);

  // 1. Extract Unique Sessions from raw API data
  useEffect(() => {
    if (schoolClasses && schoolClasses.length > 0) {
      const uniqueYears = [...new Set(schoolClasses.map(item => item.academicYear))];
      setSessions(uniqueYears.map(year => ({ label: year, value: year })));
    }
  }, [schoolClasses]);

  // 2. When Session changes -> Filter Unique Classes
  useEffect(() => {
    if (!student.session) {
      setClasses([]);
      return;
    }

    const filtered = schoolClasses
      .filter(item => item.academicYear === student.session)
      .map(item => item.className);

    const uniqueClasses = [...new Set(filtered)].sort().map(cls => ({
      label: `Class ${cls}`,
      value: cls
    }));

    setClasses(uniqueClasses);
    // Reset downstream selections
    setSections([]);
    setStudent(prev => ({ ...prev, className: '', section: '' }));
  }, [student.session]);

  // 3. When Class changes -> Filter Sections
  useEffect(() => {
    if (!student.className) {
      setSections([]);
      return;
    }

    const filteredSections = schoolClasses
      .filter(item =>
        item.academicYear === student.session &&
        item.className === student.className
      )
      .map(item => ({
        label: `Section ${item.section}`,
        // value: item.section
        value: item.id
      }));

    setSections(filteredSections);
    setStudent(prev => ({ ...prev, section: '' }));
  }, [student.className]);


  const updateField = (field, value) => {
    setStudent(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };
  

  const validateForm = () => {
    const newErrors = {};

    if (!student.name.trim()) {
      newErrors.name = 'Student name is required';
    }

    if (!student.fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
    }

    if (!student.className.trim()) {
      newErrors.className = 'Class is required';
    }

    if (!student.rollNumber.trim()) {
      newErrors.rollNumber = 'Roll number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await addStudent(student);
      navigation.pop();
    } catch (error) {
      console.error('Error adding student:', error);
      setErrors({ submit: 'Failed to add student. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.pop();
  };


  const removeImage = () => {
    setStudentImage(null);
  };

  return (
    <View style={AddStudentStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={AddStudentStyles.container}
      >

        <SubHeader title="Add Student" />

        {/* Form Content */}
        <ScrollView
          style={AddStudentStyles.scrollContainer}
          contentContainerStyle={AddStudentStyles.scrollContentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Info Box */}
          <View style={AddStudentStyles.infoBox}>
            <Text style={AddStudentStyles.infoText}>
              ℹ️ All fields marked with * are required
            </Text>
          </View>

          {/* Image Upload Card */}
          <View style={AddStudentStyles.formCard}>
            <Text style={AddStudentStyles.sectionTitle}>📸 Student Photo</Text>

            {studentImage ? (
              <View style={AddStudentStyles.imagePreviewContainer}>
                <Image
                  source={{ uri: studentImage }}
                  style={AddStudentStyles.imagePreview}
                />
                <TouchableOpacity
                  style={AddStudentStyles.removeImageButton}
                  onPress={removeImage}
                >
                  <Text style={AddStudentStyles.removeImageText}>✕ Remove</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={AddStudentStyles.uploadButton}
                //onPress={pickImage}
                onPress={() =>
                  handleImageUpload(async (imageUrl) => {
                    try {
                      console.log('Uploaded Image URL:', imageUrl);

                      // 1. Get the displayable URI (if needed for local blob/base64)
                      const displayUri = await getImage(imageUrl);
                      setStudentImage(displayUri);

                      // 2. IMPORTANT: Update the student object so the URL is sent to the backend on Save
                      setStudent(prev => ({
                        ...prev,
                        image: imageUrl // Make sure your backend expects this field name
                      }));
                    } catch (error) {
                      console.error("Error setting image:", error);
                    }
                  })
                }
              >
                <Text style={AddStudentStyles.uploadButtonText}>📁 Upload Photo</Text>
                <Text style={AddStudentStyles.uploadSubtext}>
                  Tap to choose from gallery or camera
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Form Card */}
          <View style={AddStudentStyles.formCard}>
            {/* Personal Information Section */}
            <Text style={AddStudentStyles.sectionTitle}>Personal Information</Text>


            {/* Name Field */}
            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Aadhar Number *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.aadharNumber && AddStudentStyles.inputError,
                ]}
                placeholder="Enter Aadhar Number"
                placeholderTextColor="#999"
                value={student.aadharNumber}
                onChangeText={v => updateField('aadharNumber', v)}
                editable={!loading}
              />
              {errors.aadharNumber && (
                <Text style={AddStudentStyles.errorText}>{errors.aadharNumber}</Text>
              )}
            </View>

            {/* Name Field */}
            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Student Name *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.name && AddStudentStyles.inputError,
                ]}
                placeholder="Enter full name"
                placeholderTextColor="#999"
                value={student.name}
                onChangeText={v => updateField('name', v)}
                editable={!loading}
              />
              {errors.name && (
                <Text style={AddStudentStyles.errorText}>{errors.name}</Text>
              )}
            </View>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Mother's Name *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.motherName && AddStudentStyles.inputError,
                ]}
                placeholder="Enter mother's name"
                placeholderTextColor="#999"
                value={student.motherName}
                onChangeText={v => updateField('motherName', v)}
                editable={!loading}
              />
              {errors.motherName && (
                <Text style={AddStudentStyles.errorText}>{errors.motherName}</Text>
              )}
            </View>

            {/* Father's Name Field */}
            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Father's Name *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.fatherName && AddStudentStyles.inputError,
                ]}
                placeholder="Enter father's name"
                placeholderTextColor="#999"
                value={student.fatherName}
                onChangeText={v => updateField('fatherName', v)}
                editable={!loading}
              />
              {errors.fatherName && (
                <Text style={AddStudentStyles.errorText}>{errors.fatherName}</Text>
              )}
            </View>


            <View style={AddStudentStyles.rowContainer}>
              {/* Date of Birth Field */}
              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Gender *</Text>
                <TextInput
                  style={[
                    AddStudentStyles.input,
                    errors.gender && AddStudentStyles.inputError,
                  ]}
                  placeholder="Select Gender"
                  placeholderTextColor="#999"
                  value={student.gender}
                  onChangeText={v => updateField('gender', v)}
                  editable={!loading}
                />
                {errors.gender && (
                  <Text style={AddStudentStyles.errorText}>{errors.gender}</Text>
                )}
              </View>

              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Date Of Birth *</Text>
                <DatePickerInput
                  label="Date Of Birth *"
                  value={student.dateOfBirth}
                  onChange={(val) => updateField('dateOfBirth', val)}
                  error={errors.dateOfBirth}
                  placeholder="YYYY-MM-DD"
                />

                {errors.dateOfBirth && (
                  <Text style={AddStudentStyles.errorText}>{errors.dateOfBirth}</Text>
                )}
              </View>
            </View>

            <View style={AddStudentStyles.rowContainer}>
              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Social Category</Text>
                <TextInput
                  style={[
                    AddStudentStyles.input,
                    errors.socialCategory && AddStudentStyles.inputError,
                  ]}
                  placeholder="Select Category"
                  placeholderTextColor="#999"
                  value={student.socialCategory}
                  onChangeText={v => updateField('socialCategory', v)}
                  editable={!loading}
                />
                {errors.socialCategory && (
                  <Text style={AddStudentStyles.errorText}>{errors.socialCategory}</Text>
                )}
              </View>

              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Religion</Text>
                <TextInput
                  style={[
                    AddStudentStyles.input,
                    errors.religion && AddStudentStyles.inputError,
                  ]}
                  placeholder="Select Religion"
                  placeholderTextColor="#999"
                  value={student.religion}
                  onChangeText={v => updateField('religion', v)}
                  editable={!loading}
                />
                {errors.religion && (
                  <Text style={AddStudentStyles.errorText}>{errors.religion}</Text>
                )}
              </View>

            </View>


            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Mobile Number *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.mobileNumber && AddStudentStyles.inputError,
                ]}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#999"
                value={student.mobileNumber}
                onChangeText={v => updateField('mobileNumber', v)}
                editable={!loading}
              />
              {errors.mobileNumber && (
                <Text style={AddStudentStyles.errorText}>{errors.mobileNumber}</Text>
              )}
            </View>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Email *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.email && AddStudentStyles.inputError,
                ]}
                placeholder="Enter Email"
                placeholderTextColor="#999"
                value={student.email}
                onChangeText={v => updateField('email', v)}
                editable={!loading}
              />
              {errors.email && (
                <Text style={AddStudentStyles.errorText}>{errors.email}</Text>
              )}
            </View>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Address *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.studentAddress && AddStudentStyles.inputError, AddStudentStyles.multilineInput
                ]}
                placeholder="Enter Address"
                placeholderTextColor="#999"
                value={student.studentAddress}
                multiline={true}
                numberOfLines={4}
                onChangeText={v => updateField('studentAddress', v)}
                editable={!loading}
              />
              {errors.studentAddress && (
                <Text style={AddStudentStyles.errorText}>{errors.studentAddress}</Text>
              )}
            </View>


            {/* Academic Information Section */}
            <Text style={[AddStudentStyles.sectionTitle, { marginTop: 20 }]}>
              Academic Information
            </Text>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>District *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.district && AddStudentStyles.inputError,
                ]}
                placeholder="Enter District"
                placeholderTextColor="#999"
                value={student.district}
                onChangeText={v => updateField('district', v)}
                editable={!loading}
              />
              {errors.district && (
                <Text style={AddStudentStyles.errorText}>{errors.district}</Text>
              )}
            </View>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Block *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.block && AddStudentStyles.inputError,
                ]}
                placeholder="Enter Block"
                placeholderTextColor="#999"
                value={student.block}
                onChangeText={v => updateField('block', v)}
                editable={!loading}
              />
              {errors.block && (
                <Text style={AddStudentStyles.errorText}>{errors.block}</Text>
              )}
            </View>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>School Name *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.school && AddStudentStyles.inputError,
                ]}
                placeholder="Enter School Name"
                placeholderTextColor="#999"
                value={student.school}
                onChangeText={v => updateField('school', v)}
                editable={!loading}
              />
              {errors.school && (
                <Text style={AddStudentStyles.errorText}>{errors.school}</Text>
              )}
            </View>


            {/* Class and Roll No Row */}
            <View style={AddStudentStyles.rowContainer}>
              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Session *</Text>
                <DropdownComponent
                  data={sessions} // Array of {label, value}
                  placeholder="Select Session"
                  value={student.session}
                  onChange={(val) => updateField('session', val)}
                />
                {errors.session && (
                  <Text style={AddStudentStyles.errorText}>{errors.session}</Text>
                )}
              </View>




              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Admission Number *</Text>
                <TextInput
                  style={[
                    AddStudentStyles.input,
                    errors.admissionNumber && AddStudentStyles.inputError,
                  ]}
                  placeholder="e.g., 01/2026"
                  placeholderTextColor="#999"
                  value={student.admissionNumber}
                  onChangeText={v => updateField('admissionNumber', v)}
                  editable={!loading}
                  keyboardType="numeric"
                />
                {errors.admissionNumber && (
                  <Text style={AddStudentStyles.errorText}>{errors.admissionNumber}</Text>
                )}
              </View>
            </View>

            <View style={AddStudentStyles.rowContainer}>
              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Admission Date *</Text>
                <DatePickerInput
                  label="Admission Date *"
                  value={student.dateOfAdmission}
                  onChange={(val) => updateField('dateOfAdmission', val)}
                  error={errors.dateOfAdmission}
                  placeholder="YYYY-MM-DD"
                />

                {errors.dateOfAdmission && (
                  <Text style={AddStudentStyles.errorText}>{errors.dateOfAdmission}</Text>
                )}

              </View>

              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Class *</Text>
                <DropdownComponent
                  data={classes}
                  placeholder={student.session ? "Select Class" : "Select Session First"}
                  value={student.className}
                  onChange={(val) => updateField('className', val)}
                  disable={!student.session}
                  error={errors.className}
                />
                {errors.className && (
                  <Text style={AddStudentStyles.errorText}>{errors.className}</Text>
                )}
              </View>
            </View>

            <View style={AddStudentStyles.rowContainer}>
              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Section *</Text>
                <DropdownComponent
                  data={sections}
                  placeholder={student.className ? "Select Section" : "Select Class First"}
                  value={student.section}
                  onChange={(val) => {
                    updateField('section', val);
                    updateField('schoolClassId', val);

                  }}
                  disable={!student.className}
                  error={errors.className}
                />
                {errors.section && (
                  <Text style={AddStudentStyles.errorText}>{errors.section}</Text>
                )}
              </View>

              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Roll No *</Text>
                <TextInput
                  style={[
                    AddStudentStyles.input,
                    errors.rollNumber && AddStudentStyles.inputError,
                  ]}
                  placeholder="e.g. 25"
                  placeholderTextColor="#999"
                  value={student.rollNumber}
                  onChangeText={v => updateField('rollNumber', v)}
                  editable={!loading}
                  keyboardType="numeric"
                />
                {errors.rollNumber && (
                  <Text style={AddStudentStyles.errorText}>{errors.rollNumber}</Text>
                )}
              </View>
            </View>


            {/* Banking Information Section */}
            <Text style={[AddStudentStyles.sectionTitle, { marginTop: 20 }]}>
              Banking Information
            </Text>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Account Number *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.accountNo && AddStudentStyles.inputError,
                ]}
                placeholder="Enter account number"
                placeholderTextColor="#999"
                value={student.accountNo}
                onChangeText={v => updateField('accountNo', v)}
                editable={!loading}
              />
              {errors.accountNo && (
                <Text style={AddStudentStyles.errorText}>{errors.accountNo}</Text>
              )}
            </View>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Account Holder Name *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.accountHolderName && AddStudentStyles.inputError,
                ]}
                placeholder="Enter Account Holder Name"
                placeholderTextColor="#999"
                value={student.accountHolderName}
                onChangeText={v => updateField('accountHolderName', v)}
                editable={!loading}
              />
              {errors.accountHolderName && (
                <Text style={AddStudentStyles.errorText}>{errors.accountHolderName}</Text>
              )}
            </View>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Name of bank *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.studentBankName && AddStudentStyles.inputError,
                ]}
                placeholder="Enter Name of bank"
                placeholderTextColor="#999"
                value={student.studentBankName}
                onChangeText={v => updateField('studentBankName', v)}
                editable={!loading}
              />
              {errors.email && (
                <Text style={AddStudentStyles.errorText}>{errors.studentBankName}</Text>
              )}
            </View>

            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Ifsc *</Text>
              <TextInput
                style={[
                  AddStudentStyles.input,
                  errors.ifsc && AddStudentStyles.inputError,
                ]}
                placeholder="Enter ifsc"
                placeholderTextColor="#999"
                value={student.ifsc}
                onChangeText={v => updateField('ifsc', v)}
                editable={!loading}
              />
              {errors.ifsc && (
                <Text style={AddStudentStyles.errorText}>{errors.ifsc}</Text>
              )}
            </View>

            {/* Submit Error */}
            {errors.submit && (
              <View style={[AddStudentStyles.infoBox, { backgroundColor: '#ffebee' }]}>
                <Text
                  style={[
                    AddStudentStyles.infoText,
                    { color: '#c62828' },
                  ]}
                >
                  ❌ {errors.submit}
                </Text>
              </View>
            )}

            {/* Action Buttons */}
            <View style={AddStudentStyles.buttonContainer}>
              <TouchableOpacity
                style={AddStudentStyles.cancelButton}
                onPress={handleCancel}
                disabled={loading}
              >
                <Text style={AddStudentStyles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={AddStudentStyles.submitButton}
                onPress={handleSave}
                disabled={loading}
              >
                <Text style={AddStudentStyles.submitButtonText}>
                  {loading ? 'Saving...' : 'Save Student'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}