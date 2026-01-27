import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TeacherDashboard from '../screens/TeacherDashboard';
import AddTeacherScreen from '../screens/AddTeacherScreen';
import UpdateTeacherScreen from '../screens/UpdateTeacherScreen';

const Stack = createNativeStackNavigator();

export default function TeacherStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="TeacherDashboardScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen
        name="TeacherDashboardScreen"
        component={TeacherDashboard}
        options={{ title: 'Teachers' }}
      />
      <Stack.Screen
        name="ADD_TEACHER"
        component={AddTeacherScreen}
        options={{ title: 'Add Teacher' }}
      />
      <Stack.Screen
        name="UPDATE_TEACHER"
        component={UpdateTeacherScreen}
        options={{ title: 'Update Teacher' }}
      />
    </Stack.Navigator>
  );
}
