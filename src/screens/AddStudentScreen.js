import React, { useState } from 'react';
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

export default function AddStudentScreen({ onNavigate }) {
  const [student, setStudent] = useState({
    name: '',
    fatherName: '',
    className: '',
    rollNumber: '',
    dateOfBirth: '',
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [studentImage, setStudentImage] = useState(null);

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
      onNavigate('STUDENTS');
    } catch (error) {
      console.error('Error adding student:', error);
      setErrors({ submit: 'Failed to add student. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    onNavigate('STUDENTS');
  };

  const pickImage = async () => {
    try {
      // Open camera/gallery picker
      Alert.alert(
        'Upload Photo',
        'Choose source',
        [
          {
            text: 'Gallery',
            onPress: () => {
              // Placeholder for actual image picker
              // For production, use react-native-image-picker or expo-image-picker
              Alert.alert('Gallery', 'Image picker not yet configured. Use camera or upload from device.');
            },
          },
          {
            text: 'Camera',
            onPress: () => {
              // Placeholder for camera
              Alert.alert('Camera', 'Camera not yet configured.');
            },
          },
          { text: 'Cancel', style: 'cancel' },
        ]
      );
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  
  //const image = await handleImageUpload();

  const removeImage = () => {
    setStudentImage(null);
  };

  return (
    <View style={AddStudentStyles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={AddStudentStyles.container}
      >
        {/* Header */}
        {/* <View style={AddStudentStyles.header}>
          <Text style={AddStudentStyles.headerTitle}>Add Student</Text>
          <Text style={AddStudentStyles.headerSubtitle}>
            Fill in all the required details to add a new student
          </Text>
        </View> */}
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
                onPress={pickImage}
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

            {/* Date of Birth Field */}
            <View style={AddStudentStyles.formGroup}>
              <Text style={AddStudentStyles.label}>Date of Birth</Text>
              <TextInput
                style={AddStudentStyles.input}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#999"
                value={student.dateOfBirth}
                onChangeText={v => updateField('dateOfBirth', v)}
                editable={!loading}
              />
            </View>

            {/* Academic Information Section */}
            <Text style={[AddStudentStyles.sectionTitle, { marginTop: 20 }]}>
              Academic Information
            </Text>

            {/* Class and Roll No Row */}
            <View style={AddStudentStyles.rowContainer}>
              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Class *</Text>
                <TextInput
                  style={[
                    AddStudentStyles.input,
                    errors.className && AddStudentStyles.inputError,
                  ]}
                  placeholder="e.g., 10-A"
                  placeholderTextColor="#999"
                  value={student.className}
                  onChangeText={v => updateField('className', v)}
                  editable={!loading}
                />
                {errors.className && (
                  <Text style={AddStudentStyles.errorText}>{errors.className}</Text>
                )}
              </View>

              <View style={[AddStudentStyles.formGroup, AddStudentStyles.halfInput]}>
                <Text style={AddStudentStyles.label}>Roll No *</Text>
                <TextInput
                  style={[
                    AddStudentStyles.input,
                    errors.rollNumber && AddStudentStyles.inputError,
                  ]}
                  placeholder="e.g., 25"
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
