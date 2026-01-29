import React, { useContext, useState } from 'react';
import { View, Alert } from 'react-native';
import { AuthContext } from '../auth/AuthContext';
import { USER_ROLES } from '../constants/roles';
import Header from '../screens/Header';
import SideMenu from '../components/SideMenu';
import MainNavigator from './MainNavigator';
import HomeStyles from '../style/HomeStyles';
import { navigate, goHome } from './navigationService';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainNavigatorWithLayout({ navigationRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  // const handleLogout = async () => {
  //   setIsMenuOpen(false);
  //   try {
  //     await logout();
  //     Alert.alert("Session Ended", "Logged out successfully");
  //   } catch (error) {
  //     console.log("Logout Error", error);
  //   }
  // };


  const handleLogout = async () => {
    setIsMenuOpen(false);
    try {
      await logout();
      console.log("NavigationRef on Logout:", navigationRef.current);
      goHome();
      Alert.alert("Session Ended", "Logged out successfully");
    } catch (error) {
      console.log("Logout Error", error);
    }
  };

  // No handleMenuNavigation needed - using global navigation service instead
  // This prevents any conflicts or double navigation calls

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <SafeAreaView edges={['top','bottom','right']} style={{ flex: 1, backgroundColor: "#004a99" }}>
        <Header
          onMenuPress={() => setIsMenuOpen(true)}
        />

        {/* Main Content */}
        <View style={HomeStyles.contentArea}>
          <MainNavigator />
        </View>

        {/* Side Menu */}
        <SideMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onLogout={handleLogout}
          userRole={user?.role ?? USER_ROLES.GUEST}
          userName={user?.name ?? "Guest User"}
        />
      </SafeAreaView>
    </View>
  );
}
