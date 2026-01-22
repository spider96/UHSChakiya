import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/auth/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import HomeScreen from './src/screens/HomeScreen';
export default function App() {
  return (
    <AuthProvider>
       <PaperProvider>
      <HomeScreen />
      </PaperProvider>
    </AuthProvider>
  );
}
