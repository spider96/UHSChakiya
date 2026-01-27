import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoticeScreen from '../screens/NoticeScreen';
import AddNoticeScreen from '../screens/AddNoticeScreen';

const Stack = createNativeStackNavigator();

export default function NoticeStackNavigator({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="NoticeListScreen"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: { backgroundColor: 'white' }
      }}
    >
      <Stack.Screen
        name="NoticeListScreen"
        component={NoticeScreen}
        options={{ title: 'Notices' }}
      />
      <Stack.Screen
        name="ADD_NOTICE"
        component={AddNoticeScreen}
        options={{ title: 'Add Notice' }}
      />
      <Stack.Screen
        name="EDIT_NOTICE"
        component={AddNoticeScreen}
        options={{ title: 'Edit Notice' }}
      />
    </Stack.Navigator>
  );
}
