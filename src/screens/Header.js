import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar ,Image} from 'react-native';
import { Menu as MenuIcon, Menu } from 'lucide-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import styles from '../style/HomeStyles';

const Header = ({ onMenuPress,onNavigate }) => {
  return (
    <View edges={['top']} >
      <StatusBar barStyle="light-content" backgroundColor="#004a99" />
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.logoContainer}>
            <TouchableOpacity 
              onPress={() => onNavigate('HOME')} 
              activeOpacity={0.7}
              style={styles.logoPlaceholder}
            >
            <View style={styles.logoPlaceholder} >
              <Image source={require('../assets/logo.jpg')} style={styles.logoImage} />
              {/* <Text style={{ fontSize: 8, color: '#004a99', fontWeight: 'bold' }}>LOGO</Text> */}
            </View>
            </TouchableOpacity>
            <View style={styles.headerTextContainer}>
              <Text style={styles.schoolName}>UCHCH MADHYAMIK</Text>
              <Text style={styles.schoolName}>VIDYALAYA CHAKIYA</Text>
              <Text style={styles.subHeader}>Affiliated to BSEB</Text>
            </View>
          </View>
          <TouchableOpacity onPress={onMenuPress} activeOpacity={0.7}>
            <Menu color="white" size={28} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


export default Header;