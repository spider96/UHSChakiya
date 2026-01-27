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
} from 'react-native';
import SubHeader from '../components/SubHeader';
import AddTeacherStyles from '../style/AddTeacherStyles';
import { addTeacher } from '../services/teacherService';

export default function AddTeacherScreen({ navigation }) {
  const [teacher, setTeacher] = useState({
    username: '',
    teacherName: '',
    emailId: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
    active: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field, value) => {
    setTeacher(prev => ({
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

    if (!teacher.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (teacher.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    if (!teacher.teacherName.trim()) {
      newErrors.teacherName = 'Teacher name is required';
    }

    if (!teacher.emailId.trim()) {
      newErrors.emailId = 'Email ID is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(teacher.emailId)) {
      newErrors.emailId = 'Please enter a valid email';
    }

    if (!teacher.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^[0-9]{10}$/.test(teacher.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
    }

    if (!teacher.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (teacher.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!teacher.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (teacher.password !== teacher.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      console.log('Teacher data:', teacher);
      const teacherD = await addTeacher(teacher,2);
      // TODO: Replace with actual API call
      // await addTeacher(teacher);
      console.log('Teacher data:', teacher);
      Alert.alert('Success', 'Teacher added successfully!');
      navigation.pop();
    } catch (error) {
      console.error('Error adding teacher:', error);
      setErrors({ submit: 'Failed to add teacher. Please try again.' });
      Alert.alert('Error', 'Failed to add teacher. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.pop();
  };

  return (
    <View style={AddTeacherStyles.safeArea}>
      <SubHeader title="Add Teacher" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={AddTeacherStyles.container}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={AddTeacherStyles.scrollContainer}
          //contentContainerStyle={AddTeacherStyles.scrollContainer}
        >
          <View style={AddTeacherStyles.formCard}>
            <Text style={AddTeacherStyles.sectionTitle}>Basic Information</Text>

            {/* Username Field */}
            <View style={AddTeacherStyles.fieldGroup}>
              <Text style={AddTeacherStyles.label}>Username *</Text>
              <TextInput
                style={[
                  AddTeacherStyles.input,
                  errors.username && AddTeacherStyles.inputError,
                ]}
                placeholder="Enter username"
                placeholderTextColor="#999"
                value={teacher.username}
                onChangeText={(text) => updateField('username', text)}
                editable={!loading}
              />
              {errors.username && (
                <Text style={AddTeacherStyles.errorText}>{errors.username}</Text>
              )}
            </View>

            {/* Teacher Name Field */}
            <View style={AddTeacherStyles.fieldGroup}>
              <Text style={AddTeacherStyles.label}>Teacher Name *</Text>
              <TextInput
                style={[
                  AddTeacherStyles.input,
                  errors.teacherName && AddTeacherStyles.inputError,
                ]}
                placeholder="Enter teacher's full name"
                placeholderTextColor="#999"
                value={teacher.teacherName}
                onChangeText={(text) => updateField('teacherName', text)}
                editable={!loading}
              />
              {errors.teacherName && (
                <Text style={AddTeacherStyles.errorText}>{errors.teacherName}</Text>
              )}
            </View>

            {/* Email Field */}
            <View style={AddTeacherStyles.fieldGroup}>
              <Text style={AddTeacherStyles.label}>Email ID *</Text>
              <TextInput
                style={[
                  AddTeacherStyles.input,
                  errors.emailId && AddTeacherStyles.inputError,
                ]}
                placeholder="Enter email address"
                placeholderTextColor="#999"
                value={teacher.emailId}
                onChangeText={(text) => updateField('emailId', text)}
                keyboardType="email-address"
                editable={!loading}
              />
              {errors.emailId && (
                <Text style={AddTeacherStyles.errorText}>{errors.emailId}</Text>
              )}
            </View>

            {/* Mobile Number Field */}
            <View style={AddTeacherStyles.fieldGroup}>
              <Text style={AddTeacherStyles.label}>Mobile Number *</Text>
              <TextInput
                style={[
                  AddTeacherStyles.input,
                  errors.mobileNumber && AddTeacherStyles.inputError,
                ]}
                placeholder="Enter 10-digit mobile number"
                placeholderTextColor="#999"
                value={teacher.mobileNumber}
                onChangeText={(text) =>
                  updateField('mobileNumber', text.replace(/[^0-9]/g, ''))
                }
                keyboardType="phone-pad"
                maxLength={10}
                editable={!loading}
              />
              {errors.mobileNumber && (
                <Text style={AddTeacherStyles.errorText}>{errors.mobileNumber}</Text>
              )}
            </View>
          </View>

          {/* Security Section */}
          <View style={AddTeacherStyles.formCard}>
            <Text style={AddTeacherStyles.sectionTitle}>Security</Text>

            {/* Password Field */}
            <View style={AddTeacherStyles.fieldGroup}>
              <Text style={AddTeacherStyles.label}>Password *</Text>
              <View style={AddTeacherStyles.passwordContainer}>
                <TextInput
                  style={[
                    AddTeacherStyles.passwordInput,
                    errors.password && AddTeacherStyles.inputError,
                  ]}
                  placeholder="Enter password (min 6 characters)"
                  placeholderTextColor="#999"
                  value={teacher.password}
                  onChangeText={(text) => updateField('password', text)}
                  secureTextEntry={!showPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={AddTeacherStyles.eyeIcon}
                >
                  <Text style={AddTeacherStyles.eyeIconText}>
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.password && (
                <Text style={AddTeacherStyles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Confirm Password Field */}
            <View style={AddTeacherStyles.fieldGroup}>
              <Text style={AddTeacherStyles.label}>Confirm Password *</Text>
              <View style={AddTeacherStyles.passwordContainer}>
                <TextInput
                  style={[
                    AddTeacherStyles.passwordInput,
                    errors.confirmPassword && AddTeacherStyles.inputError,
                  ]}
                  placeholder="Re-enter password"
                  placeholderTextColor="#999"
                  value={teacher.confirmPassword}
                  onChangeText={(text) => updateField('confirmPassword', text)}
                  secureTextEntry={!showConfirmPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={AddTeacherStyles.eyeIcon}
                >
                  <Text style={AddTeacherStyles.eyeIconText}>
                    {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
              {errors.confirmPassword && (
                <Text style={AddTeacherStyles.errorText}>
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
          </View>

          {/* Submit Error */}
          {errors.submit && (
            <View style={AddTeacherStyles.errorCard}>
              <Text style={AddTeacherStyles.submitErrorText}>{errors.submit}</Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={AddTeacherStyles.buttonContainer}>
            <TouchableOpacity
              style={[AddTeacherStyles.button, AddTeacherStyles.cancelButton]}
              onPress={handleCancel}
              disabled={loading}
            >
              <Text style={AddTeacherStyles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[AddTeacherStyles.button, AddTeacherStyles.submitButton]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={AddTeacherStyles.submitButtonText}>
                {loading ? 'Saving...' : 'Add Teacher'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
