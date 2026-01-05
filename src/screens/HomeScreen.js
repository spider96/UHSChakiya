import React , {useState} from 'react';
import styles from '../style/HomeStyles';
import Header from '../screens/Header';
import Profile from '../screens/Profile';
import TeacherDashboard from '../screens/TeacherDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import HomeContent from  "../screens/HomeContent";
import SideMenu from '../components/SideMenu';
import { USER_ROLES } from '../constants/roles';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
// Ensure these are installed: npx expo install react-native-safe-area-context lucide-react-native react-native-svg
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { 
  Menu, 
  Megaphone, 
  ChevronRight, 
  Info, 
  BookOpen, 
  Users, 
  Image as ImageIcon, 
  CheckCircle2 
} from 'lucide-react-native';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeScreen, setActiveScreen] = useState('HOME');

  const renderActiveScreen = (activeScreen) => {
    switch (activeScreen) {
      case 'HOME': return <HomeContent />;
      case 'TEACHERS': return <TeacherDashboard />;
      case 'PROFILE': return <Profile />;
      case 'TEACHERS': return <TeacherDashboard />;
      case 'STUDENTS': return <StudentDashboard />;
    
      // Add more screens here
      default: return <HomeContent />;
    }
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER stays here, it will not re-render when we change content */}
      <Header onMenuPress={() => setIsMenuOpen(true)} />

      {/* CONTENT AREA is the only part that swaps or scrolls */}
      <View style={styles.contentArea}>
       {renderActiveScreen(activeScreen)}
      </View>

      {/* SideMenu Modal will go here */}

      <SideMenu 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onNavigate={(screen) => {
          setTimeout(() => {
          setActiveScreen(screen);}, 500);
          setIsMenuOpen(false);
        }}
        userRole= {USER_ROLES.ADMIN}
      />
    </View>
  );
}