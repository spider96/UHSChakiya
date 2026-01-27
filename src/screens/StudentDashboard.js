import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Plus, Users, ClipboardList, BookOpen } from 'lucide-react-native';
import SubHeader from '../components/SubHeader';
import ActionCard from '../components/ActionCard';
import styles from '../style/StudentDashboardStyles';


export default function StudentDashboard({ navigation }) {

  return (
    <ScrollView style={styles.mainContainer}>

      <SubHeader title="Student Dashboard" />

      {/* Grid Container */}
            <View style={styles.grid}>
        <ActionCard 
          title="Add Student" 
          icon={Plus} 
          color="#4F46E5" // Indigo
          onPress={() => navigation.navigate('ADD_STUDENT')}
        />
        <ActionCard 
          title="View All" 
          icon={Users} 
          color="#10B981" // Emerald
          onPress={() => navigation.navigate('StudentList')}
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
