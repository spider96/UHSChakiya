import React, { useState, useEffect } from 'react';

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
  ActivityIndicator,
} from 'react-native';
import { Camera, Upload } from 'lucide-react-native';
import SubHeader from '../components/SubHeader';
import { getTeacherByUserId, updateTeacher } from '../services/teacherService';
import { getImage } from '../services/MediaService';
import UpdateTeacherStyles from '../style/UpdateTeacherStyles';
import { handleImageUpload } from '../utils/utils';

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
    // Personal Information
    teacherName: '',
    dateOfBirth: '',
    gender: '',
    qualification: '',
    // Professional Information
    subject: '',
    department: '',
    experience: '',
    designation: '',
    // Contact Details
    emailId: '',
    mobileNumber: '',
    alternatePhone: '',
    address: '',
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
          teacherName: teacherData.name || '',
          dateOfBirth: teacherData.dateOfBirth || '',
          gender: teacherData.gender || '',
          qualification: teacherData.qualification || '',
          subject: teacherData.subject || '',
          department: teacherData.department || '',
          experience: teacherData.experience || '',
          designation: teacherData.designation || '',
          emailId: teacherData.email || '',
          mobileNumber: teacherData.phone || '',
          alternatePhone: teacherData.alternatePhone || '',
          address: teacherData.address || '',
        });
        if (teacherData.profileImage) {
          setTeacherImage(teacherData.profileImage);
          const imageUrl = await getImage(teacherData.profileImage);
          setTeacherDispImage(imageUrl);
          //  setTeacherDispImage(await getImage(teacherData.profileImage));
          console.log('Teacher Image URL:', teacherDispImage);
        }
        setErrors({});
      } else {
        Alert.alert(
          'Teacher Not Found',
          'No teacher profile found for User ID: ' + searchUserId
        );
        setTeacherFound(false);
      }
    } catch (error) {
      console.error('Error searching teacher:', error);
      Alert.alert(
        'Error',
        'Failed to search teacher profile. ' + (error.message || '')
      );
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
      teacherName: '',
      dateOfBirth: '',
      gender: '',
      qualification: '',
      subject: '',
      department: '',
      experience: '',
      designation: '',
      emailId: '',
      mobileNumber: '',
      alternatePhone: '',
      address: '',
    });
    setTeacherImage(null);
    setErrors({});
  };

  const updateField = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.teacherName.trim()) {
      newErrors.teacherName = 'Teacher name is required';
    }

    if (!formData.qualification.trim()) {
      newErrors.qualification = 'Qualification is required';
    }

    if (!formData.designation.trim()) {
      newErrors.designation = 'Designation is required';
    }

    if (!formData.emailId.trim()) {
      newErrors.emailId = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email';
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      const updatePayload = {
        name: formData.teacherName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        qualification: formData.qualification,
        subject: formData.subject,
        department: formData.department,
        experience: formData.experience,
        designation: formData.designation,
        email: formData.emailId,
        phone: formData.mobileNumber,
        alternatePhone: formData.alternatePhone,
        address: formData.address,
      };

      await updateTeacher(teacher.id, updatePayload);
      Alert.alert('Success', 'Teacher profile updated successfully!');
      navigation.pop();
    } catch (error) {
      console.error('Error updating teacher:', error);
      Alert.alert('Error', 'Failed to update teacher profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigation.pop();
  };

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
         // contentContainerStyle={UpdateTeacherStyles.scrollContainer}
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
                    ✓ Teacher Found: {formData.teacherName}
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

          {/* Form Section - Only visible when teacher is found */}
          {teacherFound && (
            <>
              <View style={UpdateTeacherStyles.imageCard}>
                <View style={UpdateTeacherStyles.imageContainer}>
                  {teacherDispImage ? (
                    <Image
                      source={{ uri: teacherDispImage }}
                      style={UpdateTeacherStyles.profileImage}
                    />
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
                      console.log('Uploaded Image URL:', imageUrl);
                      setTeacherImage(imageUrl);
                      setTeacherDispImage(await getImage(imageUrl));
                    })
                  }
                >
                  <Upload color="white" size={18} />
                  <Text style={UpdateTeacherStyles.uploadButtonText}>Upload Photo</Text>
                </TouchableOpacity>
              </View>

              {/* Personal Information Section */}
              <View style={UpdateTeacherStyles.formCard}>
                <Text style={UpdateTeacherStyles.sectionTitle}>Personal Information</Text>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Teacher Name *</Text>
                  <TextInput
                    style={[
                      UpdateTeacherStyles.input,
                      errors.teacherName && UpdateTeacherStyles.inputError,
                    ]}
                    placeholder="Enter teacher's full name"
                    placeholderTextColor="#999"
                    value={formData.teacherName}
                    onChangeText={(text) => updateField('personal', 'teacherName', text)}
                    editable={!isSaving}
                  />
                  {errors.teacherName && (
                    <Text style={UpdateTeacherStyles.errorText}>{errors.teacherName}</Text>
                  )}
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Date of Birth</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="DD/MM/YYYY"
                      placeholderTextColor="#999"
                      value={formData.dateOfBirth}
                      onChangeText={(text) => updateField('personal', 'dateOfBirth', text)}
                      editable={!isSaving}
                    />
                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Gender</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="M/F/Other"
                      placeholderTextColor="#999"
                      value={formData.gender}
                      onChangeText={(text) => updateField('personal', 'gender', text)}
                      editable={!isSaving}
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Qualification *</Text>
                  <TextInput
                    style={[
                      UpdateTeacherStyles.input,
                      errors.qualification && UpdateTeacherStyles.inputError,
                    ]}
                    placeholder="e.g., B.Tech, M.Sc, B.Ed"
                    placeholderTextColor="#999"
                    value={formData.qualification}
                    onChangeText={(text) => updateField('personal', 'qualification', text)}
                    editable={!isSaving}
                  />
                  {errors.qualification && (
                    <Text style={UpdateTeacherStyles.errorText}>{errors.qualification}</Text>
                  )}
                </View>
              </View>

              {/* Professional Information Section */}
              <View style={UpdateTeacherStyles.formCard}>
                <Text style={UpdateTeacherStyles.sectionTitle}>Professional Information</Text>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Subject</Text>
                  <TextInput
                    style={UpdateTeacherStyles.input}
                    placeholder="e.g., Mathematics, English"
                    placeholderTextColor="#999"
                    value={formData.subject}
                    onChangeText={(text) => updateField('professional', 'subject', text)}
                    editable={!isSaving}
                  />
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Department</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="e.g., Science"
                      placeholderTextColor="#999"
                      value={formData.department}
                      onChangeText={(text) => updateField('professional', 'department', text)}
                      editable={!isSaving}
                    />
                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Experience (Years)</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="e.g., 5"
                      placeholderTextColor="#999"
                      value={formData.experience}
                      onChangeText={(text) => updateField('professional', 'experience', text)}
                      keyboardType="numeric"
                      editable={!isSaving}
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Designation *</Text>
                  <TextInput
                    style={[
                      UpdateTeacherStyles.input,
                      errors.designation && UpdateTeacherStyles.inputError,
                    ]}
                    placeholder="e.g., Senior Teacher, HOD"
                    placeholderTextColor="#999"
                    value={formData.designation}
                    onChangeText={(text) => updateField('professional', 'designation', text)}
                    editable={!isSaving}
                  />
                  {errors.designation && (
                    <Text style={UpdateTeacherStyles.errorText}>{errors.designation}</Text>
                  )}
                </View>
              </View>

              {/* Contact Details Section */}
              <View style={UpdateTeacherStyles.formCard}>
                <Text style={UpdateTeacherStyles.sectionTitle}>Contact Details</Text>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Email ID *</Text>
                  <TextInput
                    style={[
                      UpdateTeacherStyles.input,
                      errors.emailId && UpdateTeacherStyles.inputError,
                    ]}
                    placeholder="Enter email address"
                    placeholderTextColor="#999"
                    value={formData.emailId}
                    onChangeText={(text) => updateField('contact', 'emailId', text)}
                    keyboardType="email-address"
                    editable={!isSaving}
                  />
                  {errors.emailId && (
                    <Text style={UpdateTeacherStyles.errorText}>{errors.emailId}</Text>
                  )}
                </View>

                <View style={UpdateTeacherStyles.rowContainer}>
                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Mobile Number *</Text>
                    <TextInput
                      style={[
                        UpdateTeacherStyles.input,
                        errors.mobileNumber && UpdateTeacherStyles.inputError,
                      ]}
                      placeholder="10-digit number"
                      placeholderTextColor="#999"
                      value={formData.mobileNumber}
                      onChangeText={(text) =>
                        updateField('contact', 'mobileNumber', text.replace(/[^0-9]/g, ''))
                      }
                      keyboardType="phone-pad"
                      maxLength={10}
                      editable={!isSaving}
                    />
                    {errors.mobileNumber && (
                      <Text style={UpdateTeacherStyles.errorText}>{errors.mobileNumber}</Text>
                    )}
                  </View>

                  <View style={[UpdateTeacherStyles.fieldGroup, UpdateTeacherStyles.flex]}>
                    <Text style={UpdateTeacherStyles.label}>Alternate Phone</Text>
                    <TextInput
                      style={UpdateTeacherStyles.input}
                      placeholder="Optional"
                      placeholderTextColor="#999"
                      value={formData.alternatePhone}
                      onChangeText={(text) =>
                        updateField('contact', 'alternatePhone', text.replace(/[^0-9]/g, ''))
                      }
                      keyboardType="phone-pad"
                      maxLength={10}
                      editable={!isSaving}
                    />
                  </View>
                </View>

                <View style={UpdateTeacherStyles.fieldGroup}>
                  <Text style={UpdateTeacherStyles.label}>Address</Text>
                  <TextInput
                    style={[UpdateTeacherStyles.input, UpdateTeacherStyles.multilineInput]}
                    placeholder="Enter full address"
                    placeholderTextColor="#999"
                    value={formData.address}
                    onChangeText={(text) => updateField('contact', 'address', text)}
                    multiline={true}
                    numberOfLines={4}
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

          {/* Empty State */}
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
