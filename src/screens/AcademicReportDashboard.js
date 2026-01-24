import React from 'react';
import { View, ScrollView } from 'react-native';
import { BarChart3, Users, ClipboardList, BookOpen, TrendingUp, FileText, Award, Clock } from 'lucide-react-native';
import SubHeader from '../components/SubHeader';
import ActionCard from '../components/ActionCard';
import styles from '../style/AcademicReportDashboardStyles';

export default function AcademicReportDashboard({ onNavigate }) {
  return (
    <ScrollView style={styles.mainContainer}>
      <SubHeader title="Academic Report" />

      {/* Grid Container */}
      <View style={styles.grid}>
        {/* Notice Management */}
        <ActionCard 
          title="Notice Management" 
          icon={FileText} 
          color="#3B82F6" // Blue
          onPress={() => onNavigate('NOTICES')}
        />
        
        {/* Attendance Management */}
        <ActionCard 
          title="Attendance" 
          icon={ClipboardList} 
          color="#10B981" // Emerald
          onPress={() => onNavigate('ATTENDANCE')}
        />

        {/* Student Performance */}
        <ActionCard 
          title="Student Performance" 
          icon={TrendingUp} 
          color="#F59E0B" // Amber
          onPress={() => console.log('Student Performance')}
        />

        {/* Class Reports */}
        <ActionCard 
          title="Class Reports" 
          icon={BarChart3} 
          color="#8B5CF6" // Violet
          onPress={() => console.log('Class Reports')}
        />

        {/* Grade Analysis */}
        <ActionCard 
          title="Grade Analysis" 
          icon={Award} 
          color="#EC4899" // Pink
          onPress={() => console.log('Grade Analysis')}
        />

        {/* Academic Calendar */}
        <ActionCard 
          title="Academic Calendar" 
          icon={Clock} 
          color="#06B6D4" // Cyan
          onPress={() => console.log('Academic Calendar')}
        />

        {/* Exam Schedule */}
        <ActionCard 
          title="Exam Schedule" 
          icon={BookOpen} 
          color="#F97316" // Orange
          onPress={() => console.log('Exam Schedule')}
        />

        {/* Student List */}
        <ActionCard 
          title="Student List" 
          icon={Users} 
          color="#6366F1" // Indigo
          onPress={() => onNavigate('STUDENT_LIST')}
        />
      </View>
    </ScrollView>
  );
}
