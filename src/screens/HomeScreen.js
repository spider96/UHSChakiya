import React, { useState, useEffect ,useContext} from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import styles from '../style/HomeStyles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Context
import { AuthContext,AuthProvider } from '../auth/AuthContext';

// Screens
import Header from '../screens/Header';
import Profile from './UserProfile';
import TeacherDashboard from '../screens/TeacherDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import AddStudentScreen from '../screens/AddStudentScreen';
import StudentListScreen from '../screens/StudentListScreen';
import HomeContent from '../screens/HomeContent';
import LoginScreen from '../screens/LoginScreen';
import NoticeScreen from '../screens/NoticeScreen';
import SideMenu from '../components/SideMenu';

import { USER_ROLES } from '../constants/roles';

function AppContent(navigation) {
  const { user, logout, login, isLoading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState('HOME');

  useEffect(() => {
    if (!user && activeScreen !== 'HOME' && activeScreen !== 'LOGIN') {
      setActiveScreen('HOME');
    }
  }, [user]); 


const handleLogout = async () => {
    setIsMenuOpen(false);
    try {
      await logout(); // Clears storage and state globally
      setActiveScreen('HOME');
      Alert.alert("Session Ended", "Logged out successfully");
    } catch (error) {
      console.log("Logout Error", error);
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


const handleLoginSuccess = async (userData) => {
    await login(userData);
    setActiveScreen('HOME');
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'HOME': return <HomeContent onNavigate={handleNavigation} />;
      case 'PROFILE': return <Profile />;
      case 'TEACHERS': return <TeacherDashboard />;
      case 'STUDENTS': return <StudentDashboard onNavigate={handleNavigation} />;
      case 'ADD_STUDENT': return <AddStudentScreen onNavigate={handleNavigation} />;
      case 'STUDENT_LIST': return <StudentListScreen onNavigate={handleNavigation} />;
      case 'NOTICES': return <NoticeScreen  />;
      case 'LOGIN': return <LoginScreen onNavigate={handleNavigation} onLoginSuccess={handleLoginSuccess} />;
      default: return <HomeContent  onNavigate={handleNavigation}  />;
    }
  };

  return (
    <SafeAreaProvider style={styles.headerSafeArea}>

      <SafeAreaView style={{ flex: 1 }} >
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
          userRole={user?.role ?? USER_ROLES.GUEST}
          userName={user?.name ?? "Guest User"}
        />
      </SafeAreaView>

    </SafeAreaProvider>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

