import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import styles from '../style/HomeStyles';

// Screens
import Header from '../screens/Header';
import Profile from '../screens/Profile';
import TeacherDashboard from '../screens/TeacherDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import HomeContent from "../screens/HomeContent";
import LoginScreen from '../screens/LoginScreen';
import SideMenu from '../components/SideMenu';

// Utils
import { getUser,removeUser } from '../utils/storage';
import { USER_ROLES } from '../constants/roles';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeScreen, setActiveScreen] = useState('HOME');
  const [isLoading, setIsLoading] = useState(true);

 useEffect(() => {
    const loadData = async () => {
      try {
        const user = await getUser();
        if (user) setCurrentUser(user);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);


  // REAL LOGOUT LOGIC
  const handleLogout = async () => {
    setIsMenuOpen(false); // Close menu
    try {
      await removeUser(); // 1. Clear Storage
      setCurrentUser(null); // 2. Clear State (this resets the SideMenu to GUEST)
      setActiveScreen('HOME'); // 3. Go back to Home
      Alert.alert("Success", "Logged out successfully");
    } catch (error) {
      console.log("Error", "Failed to logout", error);
    }
  };

  const handleNavigation = (screen) => {
    // 1. Start closing the menu
    setIsMenuOpen(false);
    
    // 2. Delay the screen swap slightly so it happens while the menu is sliding
    setTimeout(() => {
      setActiveScreen(screen);
    }, 200);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setActiveScreen('HOME');
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'HOME': return <HomeContent />;
      case 'PROFILE': return <Profile />;
      case 'TEACHERS': return <TeacherDashboard />;
      case 'STUDENTS': return <StudentDashboard />;
      case 'LOGIN': return <LoginScreen onNavigate={handleNavigation} onLoginSuccess={handleLoginSuccess} />;
      default: return <HomeContent />;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Header onMenuPress={() => setIsMenuOpen(true)} onNavigate={handleNavigation} />
        <View style={styles.contentArea}>
          {renderActiveScreen()}
        </View>
      </View>

      {/* SideMenu is now OUTSIDE the main container as an overlay */}
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        userRole={currentUser?.role ?? USER_ROLES.GUEST}
        userName={currentUser?.name ?? "Guest User"}
      />
    </View>
  );
}