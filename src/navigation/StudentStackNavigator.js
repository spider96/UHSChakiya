import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudentListScreen from '../screens/StudentListScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import EditStudentScreen from '../screens/EditStudentScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';
import StudentDashboard from '../screens/StudentDashboard';

const Stack = createNativeStackNavigator();

export default function StudentStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="StudentDashboardScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
        gestureEnabled: true,
        gestureResponseDistance: 200,
      }}
    >
      <Stack.Screen
        name="StudentDashboardScreen"
        component={StudentDashboard}
        options={{ title: 'Students' }}
      />
      <Stack.Screen
        name="StudentList"
        component={StudentListScreen}
        options={{ title: 'Students' }}
      />
      <Stack.Screen
        name="ADD_STUDENT"
        component={AddStudentScreen}
        options={{ title: 'Add Student' }}
      />
      <Stack.Screen
        name="EDIT_STUDENT"
        component={EditStudentScreen}
        options={{ title: 'Edit Student' }}
      />
      <Stack.Screen
        name="StudentDetail"
        component={StudentDetailScreen}
        options={{ title: 'Student Details' }}
      />
    </Stack.Navigator>
  );
}
