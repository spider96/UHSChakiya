import React, { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, View, Text, Modal, Pressable, 
  Dimensions, TouchableOpacity, ScrollView, Animated 
} from 'react-native';
import { 
  X, LayoutDashboard, Users, BookOpen, 
  LogOut, Info, ShieldCheck 
} from 'lucide-react-native';

const { width, height } = Dimensions.get('window');
const MENU_WIDTH = width * 0.75;

const SideMenu = ({ isOpen, onClose, onNavigate, userRole = 'admin' }) => {
  // 1. Force the initial position to be off-screen (Right)
  const slideAnim = useRef(new Animated.Value(MENU_WIDTH)).current;
  
  // 2. Track internal visibility to prevent "ghosting"
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Slide In
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400, // Slightly faster for better feel
        useNativeDriver: true,
      }).start();
    } else {
      // Slide Out
      Animated.timing(slideAnim, {
        toValue: MENU_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShouldRender(false); // Only stop rendering AFTER animation finishes
      });
    }
  }, [isOpen]);

  // If not open and animation finished, return null to prevent ghosting
  if (!shouldRender && !isOpen) return null;

  return (
    <Modal
      transparent={true}
      visible={isOpen}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        {/* Backdrop Fade logic can be added here if needed */}
        <Pressable style={styles.backdrop} onPress={onClose} />

        <Animated.View 
          style={[
            styles.menuContent, 
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <View style={styles.menuHeader}>
            <View style={styles.profileSection}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{userRole[0].toUpperCase()}</Text>
              </View>
              <View>
                <Text style={styles.schoolNameSmall}>U.M.V. CHAKIYA</Text>
                <Text style={styles.roleLabel}>{userRole.toUpperCase()} PORTAL</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose}>
              <X color="white" size={24} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.menuList} bounces={false}>
            <MenuLink icon={<LayoutDashboard color="#004a99" size={22} />} label="Dashboard" onPress={() => onNavigate('HOME')} />
            <MenuLink icon={<BookOpen color="#004a99" size={22} />} label="Academic Calendar" onPress={() => onNavigate('CALENDAR')} />

            {userRole === 'admin' && (
              <>
                <View style={styles.divider} />
                <Text style={styles.sectionLabel}>Management</Text>
                <MenuLink icon={<Users color="#004a99" size={22} />} label="Teacher Records" onPress={() => onNavigate('TEACHERS')} />
                <MenuLink icon={<ShieldCheck color="#004a99" size={22} />} label="Fee Reports" onPress={() => onNavigate('FEES')} />
              </>
            )}

            <View style={styles.divider} />
            <MenuLink icon={<Info color="#004a99" size={22} />} label="Support" onPress={() => onNavigate('SUPPORT')} />
            
            <TouchableOpacity style={styles.logoutBtn}>
              <LogOut color="#d9534f" size={20} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const MenuLink = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.linkItem} onPress={onPress}>
    {icon}
    <Text style={styles.linkLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' },
  backdrop: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.6)' },
  menuContent: { 
    width: MENU_WIDTH, 
    backgroundColor: 'white', 
    height: '100%', 
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: -3, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  menuHeader: { 
    backgroundColor: '#004a99', 
    paddingTop: 20, 
    paddingBottom: 20, 
    paddingHorizontal: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#f38120'
  },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  avatarCircle: { width: 45, height: 45, borderRadius: 22.5, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  avatarText: { color: '#004a99', fontWeight: 'bold', fontSize: 18 },
  schoolNameSmall: { color: 'white', fontWeight: 'bold', fontSize: 14 },
  roleLabel: { color: '#cfe2ff', fontSize: 10, marginTop: 2 },
  menuList: { padding: 15 },
  linkItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 10 },
  linkLabel: { marginLeft: 15, fontSize: 15, color: '#333', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#eee', marginVertical: 10 },
  sectionLabel: { fontSize: 11, color: '#999', marginLeft: 10, marginBottom: 5, fontWeight: 'bold' },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', padding: 15, marginTop: 20 },
  logoutText: { color: '#d9534f', fontWeight: 'bold', marginLeft: 15 }
});

export default SideMenu;