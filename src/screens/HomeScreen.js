import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import styles from '../style/HomeStyles';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

// Context
import { AuthContext, AuthProvider } from '../auth/AuthContext';

// Screens
import Header from '../screens/Header';
import Profile from './UserProfile';
import TeacherDashboard from '../screens/TeacherDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import AddStudentScreen from '../screens/AddStudentScreen';
import AddTeacherScreen from '../screens/AddTeacherScreen';
import UpdateTeacherScreen from '../screens/UpdateTeacherScreen';
import StudentListScreen from '../screens/StudentListScreen';
import HomeContent from '../screens/HomeContent';
import LoginScreen from '../screens/LoginScreen';
import NoticeScreen from '../screens/NoticeScreen';
import AddNoticeScreen from '../screens/AddNoticeScreen';
import AcademicReportDashboard from '../screens/AcademicReportDashboard';
import AttendanceDashboard from '../screens/AttendanceDashboard';
import MarkAttendanceScreen from '../screens/MarkAttendanceScreen';
import ViewAttendanceScreen from '../screens/ViewAttendanceScreen';
import AttendanceStatsScreen from '../screens/AttendanceStatsScreen';
import SideMenu from '../components/SideMenu';

import { USER_ROLES } from '../constants/roles';

function AppContent(navigation) {
  const { user, logout, login, isLoading } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState('HOME');
  const [navigationParams, setNavigationParams] = useState({});

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


  const handleNavigation = (screen, params = {}) => {
    // 1. Start closing the menu
    setIsMenuOpen(false);
    // 2. Store any navigation params
    if (params) {
      setNavigationParams(params);
    }
    // 3. Switch screen immediately without delay
    setActiveScreen(screen);
  };


  const handleLoginSuccess = async (userData) => {
    await login(userData);
    setActiveScreen('HOME');
  };

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'HOME': return <HomeContent onNavigate={handleNavigation} />;
      case 'PROFILE': return <Profile />;
      case 'TEACHERS': return <TeacherDashboard onNavigate={handleNavigation} />;
      case 'ADD_TEACHER': return <AddTeacherScreen onNavigate={handleNavigation} />;
      case 'UPDATE_TEACHER': return <UpdateTeacherScreen onNavigate={handleNavigation} />;
      case 'STUDENTS': return <StudentDashboard onNavigate={handleNavigation} />;
      case 'ADD_STUDENT': return <AddStudentScreen onNavigate={handleNavigation} />;
      case 'STUDENT_LIST': return <StudentListScreen onNavigate={handleNavigation} />;
      case 'NOTICES': return <NoticeScreen onNavigate={handleNavigation} source={navigationParams?.source} />;
      case 'ADD_NOTICE': return <AddNoticeScreen onNavigate={handleNavigation} source={navigationParams?.source} />;
      case 'EDIT_NOTICE': return <AddNoticeScreen onNavigate={handleNavigation} source={navigationParams?.source} noticeId={navigationParams.noticeId} editMode={true} allNotices={navigationParams.allNotices} />;
      case 'ACADEMIC_REPORT': return <AcademicReportDashboard onNavigate={handleNavigation} />;
      case 'ATTENDANCE': return <AttendanceDashboard onNavigate={handleNavigation} />;
      case 'MARK_ATTENDANCE': return <MarkAttendanceScreen onNavigate={handleNavigation} />;
      case 'VIEW_ATTENDANCE': return <ViewAttendanceScreen onNavigate={handleNavigation} />;
      case 'ATTENDANCE_STATS': return <AttendanceStatsScreen onNavigate={handleNavigation} />;
      case 'LOGIN': return <LoginScreen onNavigate={handleNavigation} onLoginSuccess={handleLoginSuccess} />;
      default: return <HomeContent onNavigate={handleNavigation} />;
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

