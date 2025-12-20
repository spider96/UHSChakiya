import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StudentListScreen from '../screens/StudentListScreen';
import AddStudentScreen from '../screens/AddStudentScreen';
import StudentDetailScreen from '../screens/StudentDetailScreen';

const Stack = createNativeStackNavigator();

export default function StudentStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StudentList"
        component={StudentListScreen}
        options={{ title: 'Students' }}
      />
      <Stack.Screen
        name="AddStudent"
        component={AddStudentScreen}
        options={{ title: 'Add Student' }}
      />
      <Stack.Screen
        name="StudentDetail"
        component={StudentDetailScreen}
        options={{ title: 'Student Details' }}
      />
    </Stack.Navigator>
  );
}
