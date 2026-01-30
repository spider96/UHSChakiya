import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
} from 'react-native';
import { Camera, Upload } from 'lucide-react-native';
import SubHeader from '../components/SubHeader';
import { getTeacherByUserId, updateTeacher } from '../services/teacherService';
import { getImage } from '../services/MediaService';
import UpdateTeacherStyles from '../style/UpdateTeacherStyles';
import { handleImageUpload } from '../utils/utils';
import DatePickerInput from '../components/DatePickerInput';

export default function UpdateTeacherScreen({ navigation }) {
  const [searchUserId, setSearchUserId] = useState('');
  const [teacher, setTeacher] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [teacherImage, setTeacherImage] = useState(null);
  const [teacherDispImage, setTeacherDispImage] = useState(null);
  const [teacherFound, setTeacherFound] = useState(false);

  const [formData, setFormData] = useState({
    // Personal
    name: '',
    gender: '',
    dateOfBirth: '',
    socialCategory: '',
    religion: '',
    panNumber: '',
    fatherName: '',
    motherName: '',
    maritalStatus: '',
    bloodGroup: '',
    aadhaarNumber: '',
    email: '',
    // Professional
    bpscRollNumber: '',
    natureOfAppointment: '',
    teacherType: '',
    dateOfJoiningService: '',
    classCategory: '',
    appointedSubject: '',
    postingDistrict: '',
    postingBlock: '',
    cluster: '',
    schoolName: '',
    appointmentLevel: '',
    appointingAuthority: '',
    currentSchoolJoiningDate: '',
    appointmentCategory: '',
    // Contact
    mobileNumber: '',
    permanentAddressLine1: '',
    permanentDistrict: '',
    permanentPinCode: '',
    permanentState: '',
    currentAddressLine1: '',
    currentDistrict: '',
    currentPinCode: '',
    currentState: '',
  });

  const handleSearchTeacher = async () => {
    if (!searchUserId.trim()) {
      Alert.alert('Validation', 'Please enter a User ID');
      return;
    }
    setIsSearching(true);
    try {
      const teacherData = await getTeacherByUserId(searchUserId);
      if (teacherData) {
        setTeacher(teacherData);
        setTeacherFound(true);

        setFormData({
          name: teacherData.name || '',
          gender: teacherData.gender || '',
          dateOfBirth: teacherData.dateOfBirth || '',
          socialCategory: teacherData.socialCategory || '',
          religion: teacherData.religion || '',
          panNumber: teacherData.panNumber || '',
          fatherName: teacherData.fatherName || '',
          motherName: teacherData.motherName || '',
          maritalStatus: teacherData.maritalStatus || '',
          bloodGroup: teacherData.bloodGroup || '',
          aadhaarNumber: teacherData.aadhaarNumber || '',
          email: teacherData.email || '',

          bpscRollNumber: teacherData.bpscRollNumber || '',
          natureOfAppointment: teacherData.natureOfAppointment || '',
          teacherType: teacherData.teacherType || '',
          dateOfJoiningService: teacherData.dateOfJoiningService || '',
          classCategory: teacherData.classCategory || '',
          appointedSubject: teacherData.appointedSubject || '',
          postingDistrict: teacherData.postingDistrict || '',
          postingBlock: teacherData.postingBlock || '',
          cluster: teacherData.cluster || '',
          schoolName: teacherData.schoolName || '',
          appointmentLevel: teacherData.appointmentLevel || '',
          appointingAuthority: teacherData.appointingAuthority || '',
          currentSchoolJoiningDate: teacherData.currentSchoolJoiningDate || '',
          appointmentCategory: teacherData.appointmentCategory || '',

          mobileNumber: teacherData.mobileNumber || '',
          permanentAddressLine1: teacherData.permanentAddressLine1 || '',
          permanentDistrict: teacherData.permanentDistrict || '',
          permanentPinCode: teacherData.permanentPinCode || '',
          permanentState: teacherData.permanentState || '',
          currentAddressLine1: teacherData.currentAddressLine1 || '',
          currentDistrict: teacherData.currentDistrict || '',
          currentPinCode: teacherData.currentPinCode || '',
          currentState: teacherData.currentState || '',
        });

        if (teacherData.imageUrl || teacherData.profileImage) {
          const imageKey = teacherData.imageUrl || teacherData.profileImage;
          setTeacherImage(imageKey);
          const displayUrl = await getImage(imageKey);
          setTeacherDispImage(displayUrl);
        }

        setErrors({});
      } else {
        Alert.alert('Teacher Not Found', 'No teacher profile found for User ID: ' + searchUserId);
        setTeacherFound(false);
      }
    } catch (error) {
      console.error('Error searching teacher:', error);
      Alert.alert('Error', 'Failed to search teacher profile.');
      setTeacherFound(false);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchUserId('');
    setTeacher(null);
    setTeacherFound(false);
    setFormData({
      name: '', gender: '', dateOfBirth: '', socialCategory: '', religion: '',
      panNumber: '', fatherName: '', motherName: '', maritalStatus: '', bloodGroup: '',
      aadhaarNumber: '', email: '',
      bpscRollNumber: '', natureOfAppointment: '', teacherType: '',
      dateOfJoiningService: '', classCategory: '', appointedSubject: '',
      postingDistrict: '', postingBlock: '', cluster: '', schoolName: '',
      appointmentLevel: '', appointingAuthority: '', currentSchoolJoiningDate: '',
      appointmentCategory: '',
      mobileNumber: '', permanentAddressLine1: '', permanentDistrict: '',
      permanentPinCode: '', permanentState: '', currentAddressLine1: '',
      currentDistrict: '', currentPinCode: '', currentState: '',
    });
    setTeacherImage(null);
    setTeacherDispImage(null);
    setErrors({});
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Teacher name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
    else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Enter a valid 10-digit mobile number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    setIsSaving(true);
    try {
      const payload = {
        name: formData.name,
        gender: formData.gender,
        dateOfBirth: formData.dateOfBirth,
        socialCategory: formData.socialCategory,
        religion: formData.religion,
        panNumber: formData.panNumber,
        fatherName: formData.fatherName,
        motherName: formData.motherName,
        maritalStatus: formData.maritalStatus,
        bloodGroup: formData.bloodGroup,
        aadhaarNumber: formData.aadhaarNumber,
        email: formData.email,
        imageUrl: teacherImage || undefined,

        bpscRollNumber: formData.bpscRollNumber,
        natureOfAppointment: formData.natureOfAppointment,
        teacherType: formData.teacherType,
        dateOfJoiningService: formData.dateOfJoiningService,
        classCategory: formData.classCategory,
        appointedSubject: formData.appointedSubject,
        postingDistrict: formData.postingDistrict,
        postingBlock: formData.postingBlock,
        cluster: formData.cluster,
        schoolName: formData.schoolName,
        appointmentLevel: formData.appointmentLevel,
        appointingAuthority: formData.appointingAuthority,
        currentSchoolJoiningDate: formData.currentSchoolJoiningDate,
        appointmentCategory: formData.appointmentCategory,

        mobileNumber: formData.mobileNumber,
        permanentAddressLine1: formData.permanentAddressLine1,
        permanentDistrict: formData.permanentDistrict,
        permanentPinCode: formData.permanentPinCode,
        permanentState: formData.permanentState,
        currentAddressLine1: formData.currentAddressLine1,
        currentDistrict: formData.currentDistrict,
        currentPinCode: formData.currentPinCode,
        currentState: formData.currentState,
      };

      await updateTeacher(teacher.id, payload);
      Alert.alert('Success', 'Teacher profile updated successfully!');
      navigation.pop();
    } catch (error) {
      console.error('Error updating teacher:', error);
      Alert.alert('Error', 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => navigation.pop();

  return (
    <View style={UpdateTeacherStyles.container}>
      <SubHeader title="Update Teacher Profile" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={UpdateTeacherStyles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={UpdateTeacherStyles.scrollContainer}
        >
          {/* Search Section */}
          <View style={UpdateTeacherStyles.formCard}>
            <Text style={UpdateTeacherStyles.sectionTitle}>Search Teacher</Text>
            <View style={UpdateTeacherStyles.fieldGroup}>
              <Text style={UpdateTeacherStyles.label}>User ID *</Text>
              <View style={UpdateTeacherStyles.searchContainer}>
                <TextInput
                  style={UpdateTeacherStyles.searchInput}
                  placeholder="Enter User ID to search"
                  placeholderTextColor="#999"
                  value={searchUserId}
                  onChangeText={setSearchUserId}
                  editable={!isSearching && !teacherFound}
                />
              </View>
            </View>

            <View style={UpdateTeacherStyles.searchButtonContainer}>
              {!teacherFound ? (
                <TouchableOpacity
                  style={[UpdateTeacherStyles.button, UpdateTeacherStyles.searchButton]}
                  onPress={handleSearchTeacher}
                  disabled={isSearching}
                >
                  <Text style={UpdateTeacherStyles.searchButtonText}>
                    {isSearching ? 'Searching...' : 'Search'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={UpdateTeacherStyles.foundContainer}>
                  <Text style={UpdateTeacherStyles.foundText}>
                    ✓ Teacher Found: {formData.name || 'Unknown'}
                  </Text>
                  <TouchableOpacity
                    style={[UpdateTeacherStyles.button, UpdateTeacherStyles.clearButton]}
                    onPress={handleClearSearch}
                  >
                    <Text style={UpdateTeacherStyles.clearButtonText}>Clear Search</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>

          {teacherFound && (
            <>
              {/* Profile Image */}
              <View style={UpdateTeacherStyles.imageCard}>
                <View style={UpdateTeacherStyles.imageContainer}>
                  {teacherDispImage ? (
                    <Image source={{ uri: teacherDispImage }} style={UpdateTeacherStyles.profileImage} />
                  ) : (
                    <View style={UpdateTeacherStyles.imagePlaceholder}>
                      <Camera color="#999" size={40} />
                      <Text style={UpdateTeacherStyles.placeholderText}>No Image</Text>
                    </View>
                  )}
                </View>

                <TouchableOpacity
                  style={UpdateTeacherStyles.uploadButton}
                  onPress={() =>
                    handleImageUpload(async (imageUrl) => {
                      setTeacherImage(imageUrl);
                      setTeacherDispImage(await getImage(imageUrl));
                    })
                  }
                >
                  <Upload color="white" size={18} />
                  <Text style={UpdateTeacherStyles.uploadButtonText}>Upload Photo</Text>
                </TouchableOpacity>
              </View>

              {/* PERSONAL INFORMATION */}
              <View style={UpdateTeacherStyles.formCard}>
                <Text style={UpdateTeacherStyles.sectionTitle}>Personal Information</Text>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Teacher Name *</Text>
                  <TextInput
                    style={[UpdateTeacherStyles.input, errors.name && UpdateTeacherStyles.inputError]}
                    placeholder="Full name"
                    value={formData.name}
                    onChangeText={(v) => updateField('name', v)}
                    editable={!isSaving}
                  />
                  {errors.name && <Text style={UpdateTeacherStyles.errorText}>{errors.name}</Text>}
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Date of Birth</Text>
                    <DatePickerInput
                      label="Date Of Birth *"
                      value={formData.dateOfBirth}
                      onChange={(val) => updateField('dateOfBirth', val)}
                      error={errors.dateOfBirth}
                      placeholder="YYYY-MM-DD"
                    />

                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Social Category</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="GEN / OBC / SC / ST"
                      value={formData.socialCategory}
                      onChangeText={(v) => updateField('socialCategory', v)}
                      editable={!isSaving}
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Gender *</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="MALE / FEMALE / OTHER"
                      value={formData.gender}
                      onChangeText={(v) => updateField('gender', v)}
                      editable={!isSaving}
                    />

                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Religion *</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="Hindu / Muslim / etc."
                      value={formData.religion}
                      onChangeText={(v) => updateField('religion', v)}
                      editable={!isSaving}
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>PAN Number</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="ABCDE1234F"
                    value={formData.panNumber}
                    onChangeText={(v) => updateField('panNumber', v.toUpperCase())}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Aadhaar Number</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="12-digit number"
                    keyboardType="numeric"
                    maxLength={12}
                    value={formData.aadhaarNumber}
                    onChangeText={(v) => updateField('aadhaarNumber', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Father's Name</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="Father name"
                    value={formData.fatherName}
                    onChangeText={(v) => updateField('fatherName', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Mother's Name</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="Mother name"
                    value={formData.motherName}
                    onChangeText={(v) => updateField('motherName', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Marital Status</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="Married / Unmarried"
                      value={formData.maritalStatus}
                      onChangeText={(v) => updateField('maritalStatus', v)}
                      editable={!isSaving}
                    />
                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Blood Group</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="A+, B+, etc."
                      value={formData.bloodGroup}
                      onChangeText={(v) => updateField('bloodGroup', v)}
                      editable={!isSaving}
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Email *</Text>
                  <TextInput
                    style={[UpdateTeacherStyles.input, errors.email && UpdateTeacherStyles.inputError]}
                    placeholder="example@domain.com"
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(v) => updateField('email', v)}
                    editable={!isSaving}
                  />
                  {errors.email && <Text style={UpdateTeacherStyles.errorText}>{errors.email}</Text>}
                </View>




                <Text style={UpdateTeacherStyles.sectionTitle}>Professional Information</Text>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>BPSC Roll Number</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="BPSC2023456"
                    value={formData.bpscRollNumber}
                    onChangeText={(v) => updateField('bpscRollNumber', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Nature of Appointment</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="School Teacher (BPSC)"
                    value={formData.natureOfAppointment}
                    onChangeText={(v) => updateField('natureOfAppointment', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Teacher Type</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="TRE-2 / PRT"
                      value={formData.teacherType}
                      onChangeText={(v) => updateField('teacherType', v)}
                      editable={!isSaving}
                    />
                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Date of Joining</Text>
                    <DatePickerInput
                      label="Date of Joining *"
                      value={formData.dateOfJoiningService}
                      onChange={(val) => updateField('dateOfJoiningService', val)}
                      error={errors.dateOfJoiningService}
                      placeholder="YYYY-MM-DD"
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Class Category</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="GT (11-12)"
                      value={formData.classCategory}
                      onChangeText={(v) => updateField('classCategory', v)}
                      editable={!isSaving}
                    />
                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Appointed Subject</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="Mathematics"
                      value={formData.appointedSubject}
                      onChangeText={(v) => updateField('appointedSubject', v)}
                      editable={!isSaving}
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Posting District</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="Patna"
                    value={formData.postingDistrict}
                    onChangeText={(v) => updateField('postingDistrict', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Posting Block</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="Danapur"
                    value={formData.postingBlock}
                    onChangeText={(v) => updateField('postingBlock', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Cluster</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="Cluster-A"
                    value={formData.cluster}
                    onChangeText={(v) => updateField('cluster', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>School Name</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="School name"
                    value={formData.schoolName}
                    onChangeText={(v) => updateField('schoolName', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Appointment Level</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="Secondary"
                      value={formData.appointmentLevel}
                      onChangeText={(v) => updateField('appointmentLevel', v)}
                      editable={!isSaving}
                    />
                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Appointing Authority</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="BPSC"
                      value={formData.appointingAuthority}
                      onChangeText={(v) => updateField('appointingAuthority', v)}
                      editable={!isSaving}
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Current Joining</Text>
                    {/* <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="YYYY-MM-DD"
                      value={formData.currentSchoolJoiningDate}
                      onChangeText={(v) => updateField('currentSchoolJoiningDate', v)}
                      editable={!isSaving}
                    /> */}

                    <DatePickerInput
                      label="Current Joining *"
                      value={formData.currentSchoolJoiningDate}
                      onChangeText={(v) => updateField('currentSchoolJoiningDate', v)}
                      error={errors.currentSchoolJoiningDate}
                      placeholder="YYYY-MM-DD"
                    />
                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Appointment Category</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="Regular"
                      value={formData.appointmentCategory}
                      onChangeText={(v) => updateField('appointmentCategory', v)}
                      editable={!isSaving}
                    />
                  </View>
                </View>


                <Text style={UpdateTeacherStyles.sectionTitle}>Contact Details</Text>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Mobile Number *</Text>
                  <TextInput
                    style={[UpdateTeacherStyles.input, errors.mobileNumber && UpdateTeacherStyles.inputError]}
                    placeholder="10-digit number"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={formData.mobileNumber}
                    onChangeText={(v) => updateField('mobileNumber', v.replace(/[^0-9]/g, ''))}
                    editable={!isSaving}
                  />
                  {errors.mobileNumber && <Text style={UpdateTeacherStyles.errorText}>{errors.mobileNumber}</Text>}
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Permanent Address Line 1</Text>
                  <TextInput
                    style={[UpdateTeacherStyles.input, UpdateTeacherStyles.multilineInput]}
                    placeholder="House no, street, village"
                    multiline
                    numberOfLines={3}
                    value={formData.permanentAddressLine1}
                    onChangeText={(v) => updateField('permanentAddressLine1', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Permanent District</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="East Champaran"
                    value={formData.permanentDistrict}
                    onChangeText={(v) => updateField('permanentDistrict', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Permanent Pin Code</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="845412"
                    keyboardType="numeric"
                    maxLength={6}
                    value={formData.permanentPinCode}
                    onChangeText={(v) => updateField('permanentPinCode', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Permanent State</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="Bihar"
                    value={formData.permanentState}
                    onChangeText={(v) => updateField('permanentState', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Current Address Line 1</Text>
                  <TextInput
                    style={[UpdateTeacherStyles.input, UpdateTeacherStyles.multilineInput]}
                    placeholder="Teacher Quarter, School Campus"
                    multiline
                    numberOfLines={3}
                    value={formData.currentAddressLine1}
                    onChangeText={(v) => updateField('currentAddressLine1', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Current District</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="Patna"
                    value={formData.currentDistrict}
                    onChangeText={(v) => updateField('currentDistrict', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Current Pin Code</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="800001"
                    keyboardType="numeric"
                    maxLength={6}
                    value={formData.currentPinCode}
                    onChangeText={(v) => updateField('currentPinCode', v)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Current State</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="Bihar"
                    value={formData.currentState}
                    onChangeText={(v) => updateField('currentState', v)}
                    editable={!isSaving}
                  />
                </View>
              </View>

              {/* Action Buttons */}
              <View style={UpdateTeacherStyles.buttonContainer}>
                <TouchableOpacity
                  style={[UpdateTeacherStyles.button, UpdateTeacherStyles.cancelButton]}
                  onPress={handleCancel}
                  disabled={isSaving}
                >
                  <Text style={UpdateTeacherStyles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[UpdateTeacherStyles.button, UpdateTeacherStyles.submitButton]}
                  onPress={handleSave}
                  disabled={isSaving}
                >
                  <Text style={UpdateTeacherStyles.submitButtonText}>
                    {isSaving ? 'Saving...' : 'Update Profile'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}

          {!teacherFound && (
            <View style={UpdateTeacherStyles.emptyStateContainer}>
              <Text style={UpdateTeacherStyles.emptyStateText}>
                Enter a User ID and click Search to load teacher profile
              </Text>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}