import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import MainNavigatorWithLayout from './MainNavigatorWithLayout';

export default function AppNavigator({ navigationRef }) {
  const { loading } = useContext(AuthContext);

  if (loading) return null;

  // Always show main navigator with header and menu
  // Login is accessible from within the navigation
  return <MainNavigatorWithLayout navigationRef={navigationRef} />;
}
