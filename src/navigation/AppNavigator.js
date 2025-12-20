import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';

export default function AppNavigator() {
  const { token, loading } = useContext(AuthContext);

  if (loading) return null;

  return token ? <MainNavigator /> : <AuthNavigator />;
}
