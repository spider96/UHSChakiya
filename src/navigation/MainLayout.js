import React, { useState, useContext } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { USER_ROLES } from '../constants/roles';
import Header from '../screens/Header';
import SideMenu from '../components/SideMenu';
import styles from '../style/HomeStyles';

export const MainLayout = ({ navigation, children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    setIsMenuOpen(false);
    try {
      await logout();
      Alert.alert("Session Ended", "Logged out successfully");
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  const handleMenuNavigation = (screen) => {
    setIsMenuOpen(false);
    navigation.navigate(screen);
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <Header 
        onMenuPress={() => setIsMenuOpen(true)}
        onNavigate={handleMenuNavigation}
      />

      {/* Main Content */}
      <View style={StyleSheet.create({ flex: 1 })}>
        {children}
      </View>

      {/* Side Menu */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleMenuNavigation}
        onLogout={handleLogout}
        userRole={user?.role ?? USER_ROLES.GUEST}
        userName={user?.name ?? "Guest User"}
      />
    </View>
  );
};

export default MainLayout;
