import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AttendanceDashboard from '../screens/AttendanceDashboard';
import MarkAttendanceScreen from '../screens/MarkAttendanceScreen';
import ViewAttendanceScreen from '../screens/ViewAttendanceScreen';
import AttendanceStatsScreen from '../screens/AttendanceStatsScreen';

const Stack = createNativeStackNavigator();

export default function AttendanceStackNavigator({ navigation }) {
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
      initialRouteName="AttendanceDashboardScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen
        name="AttendanceDashboardScreen"
        component={AttendanceDashboard}
        options={{ title: 'Attendance' }}
      />
      <Stack.Screen
        name="MARK_ATTENDANCE"
        component={MarkAttendanceScreen}
        options={{ title: 'Mark Attendance' }}
      />
      <Stack.Screen
        name="VIEW_ATTENDANCE"
        component={ViewAttendanceScreen}
        options={{ title: 'View Attendance' }}
      />
      <Stack.Screen
        name="ATTENDANCE_STATS"
        component={AttendanceStatsScreen}
        options={{ title: 'Attendance Statistics' }}
      />
    </Stack.Navigator>
  );
}
