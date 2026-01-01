import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/auth/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import HomeScreen from './src/screens/HomeScreen';
export default function App() {
  return (
    <AuthProvider>
      <HomeScreen />
    </AuthProvider>
  );
}
