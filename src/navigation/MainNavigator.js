import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AdminDashboard from '../screens/AdminDashboard';
import StudentStackNavigator from './StudentStackNavigator';

const Tab = createBottomTabNavigator();

export default function MainNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboard}
      />
      <Tab.Screen
        name="Students"
        component={StudentStackNavigator} // ✅ STACK HERE
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
