import React, { useState, useContext } from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { loginApi } from '../auth/authService';
import { AuthContext } from '../auth/AuthContext';
import LoginStyles from '../style/LoginStyles';
import SubHeader from '../components/SubHeader';

export default function LoginScreen({ onNavigate, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (password.trim() && password.length < 4) {
      newErrors.password = 'Password must be at least 4 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const userData = await loginApi(username, password);
      await login(userData);
      onLoginSuccess(userData);
      onNavigate('HOME');
    } catch (error) {
      console.error('Login error:', error);
      setErrors({
        submit: error.response?.data?.message || 'Login failed. Please check your credentials.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SubHeader title="User Login" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={LoginStyles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
          {/* Header Section */}
          <View style={LoginStyles.headerSection}>
            <View style={LoginStyles.logoContainer}>
              <View style={LoginStyles.logoCircle}>
                <Text style={LoginStyles.logoText}>UHS</Text>
              </View>
              <Text style={LoginStyles.schoolName}>UHS Chakiya</Text>
              <Text style={LoginStyles.tagline}>School Management System</Text>
            </View>
          </View>

          {/* Form Section */}
          <View style={LoginStyles.formSection}>
            {/* Submit Error */}
            {errors.submit && (
              <View style={LoginStyles.infoBox}>
                <Text style={LoginStyles.infoText}>❌ {errors.submit}</Text>
              </View>
            )}

            {/* Form Card */}
            <View style={LoginStyles.formCard}>
              <Text style={LoginStyles.welcomeText}>Welcome Back</Text>
              <Text style={LoginStyles.welcomeSubtext}>
                Sign in to access your school management dashboard
              </Text>

              {/* Username Field */}
              <View style={LoginStyles.formGroup}>
                <Text style={LoginStyles.label}>Username</Text>
                <TextInput
                  style={[
                    LoginStyles.input,
                    username && LoginStyles.inputFocused,
                    errors.username && LoginStyles.inputError,
                  ]}
                  placeholder="Enter your username"
                  placeholderTextColor="#999"
                  value={username}
                  onChangeText={val => {
                    setUsername(val);
                    if (errors.username) {
                      setErrors(prev => ({ ...prev, username: '' }));
                    }
                  }}
                  editable={!loading}
                  autoCapitalize="none"
                />
                {errors.username && (
                  <Text style={LoginStyles.errorText}>{errors.username}</Text>
                )}
              </View>

              {/* Password Field */}
              <View style={LoginStyles.formGroup}>
                <Text style={LoginStyles.label}>Password</Text>
                <View style={{ position: 'relative' }}>
                  <TextInput
                    style={[
                      LoginStyles.input,
                      password && LoginStyles.inputFocused,
                      errors.password && LoginStyles.inputError,
                    ]}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={val => {
                      setPassword(val);
                      if (errors.password) {
                        setErrors(prev => ({ ...prev, password: '' }));
                      }
                    }}
                    editable={!loading}
                    secureTextEntry={!showPassword}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: 12,
                      top: 12,
                    }}
                  >
                    <Text style={{ fontSize: 16, color: '#666' }}>
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={LoginStyles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Forgot Password */}
              <TouchableOpacity>
                <Text style={LoginStyles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* Login Button */}
              <View style={LoginStyles.buttonContainer}>
                <TouchableOpacity
                  style={LoginStyles.loginButton}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <Text style={LoginStyles.loginButtonText}>
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Demo Credentials */}
              <View style={LoginStyles.infoBox}>
                <Text style={LoginStyles.infoText}>
                  📝 Demo: Use any username and password to test
                </Text>
              </View>
            </View>
          </View>

          {/* Footer Section */}
          <View style={LoginStyles.footerSection}>
            <Text style={LoginStyles.footerText}>
              Don't have an account?{' '}
              <Text style={LoginStyles.footerLink}>Contact Administrator</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
