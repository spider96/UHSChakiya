import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Plus, Users, ClipboardList, BookOpen } from 'lucide-react-native';
import SubHeader from '../components/SubHeader';
import ActionCard from '../components/ActionCard';
import styles from '../style/TeacherDashboardStyles';


export default function TeacherDashboard() { 

  return (
    <ScrollView style={styles.mainContainer}>

      <SubHeader title="Teacher Dashboard" />

      {/* Grid Container */}
      <View style={styles.grid}>
        <ActionCard 
          title="Add Teacher" 
          icon={Plus} 
          color="#4F46E5" // Indigo
          onPress={() => console.log('Add')}
        />
        <ActionCard 
          title="View All" 
          icon={Users} 
          color="#10B981" // Emerald
          onPress={() => console.log('View')}
        />
        <ActionCard 
          title="Attendance" 
          icon={ClipboardList} 
          color="#F59E0B" // Amber
          onPress={() => console.log('Attendance')}
        />
        <ActionCard 
          title="Reports" 
          icon={BookOpen} 
          color="#EC4899" // Pink
          onPress={() => console.log('Reports')}
        />
      </View>
    </ScrollView>
  );
}
