import React, { useEffect, useRef, useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Animated,
  Easing,
  Alert
} from 'react-native';
import { X, Users, BookOpen, GraduationCap, LogOut, User } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75;

const SideMenu = ({ isOpen, onClose, onNavigate, onLogout, userRole, userName }) => {
  const slideAnim = useRef(new Animated.Value(MENU_WIDTH)).current;
  const insets = useSafeAreaInsets();
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (isOpen) {
      // Smooth Open
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.poly(4)),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Smooth Close
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: MENU_WIDTH,
          duration: 250,
          easing: Easing.in(Easing.poly(4)),
          useNativeDriver: true,
        }),
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        })
      ]).start();
    }
  }, [isOpen]);

  // Prevents the invisible menu from blocking the app when closed
  const pointerEvents = isOpen ? 'auto' : 'none';

  const safeName = userName || "Guest";
  const firstLetter = safeName[0] ? safeName[0].toUpperCase() : "?";

  return (

    <View
      style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}
      pointerEvents={pointerEvents}
    >
      {/* 1. Backdrop (Fades in/out) */}
      <Animated.View
        style={[styles.backdrop, { opacity: backdropOpacity }]}
      >
        <Pressable style={{ flex: 1 }} onPress={onClose} />
      </Animated.View>

      {/* 2. Menu Content (Slides in/out) */}
      <Animated.View
        style={[
          styles.menuContent,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <View style={[styles.menuHeader, { paddingTop: Platform.OS === 'android' ? insets.top + 10 : insets.top }]}>
          <View style={styles.profileSection}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>{firstLetter}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.userNameText} numberOfLines={1}>{safeName}</Text>
              <Text style={styles.roleLabel}>{(userRole || 'GUEST').toUpperCase()}</Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={onClose}
            hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          >
            <X color="white" size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.menuList} bounces={false}>
          {userRole === 'GUEST' ? (
            <MenuLink
              icon={<Users color="#004a99" size={22} />}
              label="Login"
              onPress={() => onNavigate('LOGIN')}
            />
          ) : (
            <>
              <MenuLink icon={<User color="#004a99" size={22} />} label="Profile" onPress={() => onNavigate('PROFILE')} />
              <MenuLink icon={<BookOpen color="#004a99" size={22} />} label="Academic Report" onPress={() => onNavigate('CALENDAR')} />

              <View style={styles.divider} />

              <Text style={styles.sectionLabel}>Management</Text>
              <MenuLink icon={<GraduationCap color="#004a99" size={22} />} label="Student Dashboard" onPress={() => onNavigate('STUDENTS')} />

              {userRole === 'ROLE_ADMIN' && (
                <MenuLink icon={<Users color="#004a99" size={22} />} label="Teacher Dashboard" onPress={() => onNavigate('TEACHERS')} />
              )}

              <View style={styles.divider} />

              <TouchableOpacity
                style={styles.linkItem}
                onPress={() => {
                  onClose();
                  setTimeout(onLogout, 400);
                }}
              >
                <LogOut color="#d9534f" size={22} />
                <Text style={[styles.linkLabel, { color: '#d9534f', fontWeight: 'bold' }]}>Logout</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const MenuLink = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.linkItem} onPress={onPress} activeOpacity={0.7}>
    {icon}
    <Text style={styles.linkLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  menuContent: {
    position: 'absolute',
    right: 0,
    width: MENU_WIDTH,
    height: height,
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  menuHeader: {
    backgroundColor: '#004a99',
    padding: 31,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#f38120'
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  avatarText: {
    color: '#004a99',
    fontWeight: 'bold',
    fontSize: 16
  },
  userNameText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14
  },
  roleLabel: {
    color: '#cfe2ff',
    fontSize: 10
  },
  menuList: {
    padding: 10
  },
  linkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  linkLabel: {
    marginLeft: 15,
    fontSize: 15,
    color: '#333'
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 5
  },
  sectionLabel: {
    fontSize: 11,
    color: '#999',
    marginLeft: 10,
    marginBottom: 5,
    fontWeight: 'bold'
  }
});

export default SideMenu;