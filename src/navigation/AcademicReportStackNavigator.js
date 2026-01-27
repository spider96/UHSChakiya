import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AcademicReportDashboard from '../screens/AcademicReportDashboard';
import NoticeStackNavigator from './NoticeStackNavigator';
import AttendanceStackNavigator from './AttendanceStackNavigator';

const Stack = createNativeStackNavigator();

export default function AcademicReportStackNavigator({ navigation }) {
  const handleBeforeRemove = (e) => {
    // Only intercept GO_BACK when we're at the root screen
    if (e.data.action.type === 'GO_BACK') {
      const state = navigation?.getState();
      if (state?.index === 0) {
        // We're at the root of this stack, go to HOME in parent stack
        e.preventDefault();
        navigation.getParent()?.reset({
          index: 0,
          routes: [{ name: 'HOME' }],
        });
      }
    }
  };

  React.useEffect(() => {
    const unsubscribe = navigation?.addListener('beforeRemove', handleBeforeRemove);
    return unsubscribe;
  }, [navigation]);

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
