import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ClipboardList, Eye, BarChart3, Home } from 'lucide-react-native';
import SubHeader from '../components/SubHeader';
import ActionCard from '../components/ActionCard';
import HomeStyles from '../style/HomeStyles';

export default function AttendanceDashboard({ onNavigate }) {
  return (
    <ScrollView style={styles.mainContainer}>
      <SubHeader title="Attendance Management" />

      {/* Grid Container */}
      <View style={styles.grid}>
        {/* Mark Attendance */}
        <ActionCard 
          title="Mark Attendance" 
          icon={ClipboardList} 
          color="#3B82F6"
          onPress={() => onNavigate('MARK_ATTENDANCE')}
        />
        
        {/* View Attendance */}
        <ActionCard 
          title="View Attendance" 
          icon={Eye} 
          color="#10B981"
          onPress={() => onNavigate('VIEW_ATTENDANCE')}
        />

        {/* Attendance Statistics */}
        <ActionCard 
          title="Attendance Statistics" 
          icon={BarChart3} 
          color="#F59E0B"
          onPress={() => onNavigate('ATTENDANCE_STATS')}
        />

        {/* Back */}
        <ActionCard 
          title="Back" 
          icon={Home} 
          color="#6B7280"
          onPress={() => onNavigate('HOME')}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 12,
    gap: 12,
  },
});
