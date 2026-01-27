import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AcademicReportDashboard from '../screens/AcademicReportDashboard';
import NoticeStackNavigator from './NoticeStackNavigator';
import AttendanceStackNavigator from './AttendanceStackNavigator';

const Stack = createNativeStackNavigator();

export default function AcademicReportStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="AcademicReportDashboardScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen
        name="AcademicReportDashboardScreen"
        component={AcademicReportDashboard}
        options={{ title: 'Academic Report' }}
      />
      <Stack.Screen
        name="NOTICES_FROM_ACADEMIC"
        component={NoticeStackNavigator}
        options={{ title: 'Notices' }}
      />
      <Stack.Screen
        name="ATTENDANCE_FROM_ACADEMIC"
        component={AttendanceStackNavigator}
        options={{ title: 'Attendance' }}
      />
    </Stack.Navigator>
  );
}
