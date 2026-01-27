import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TeacherDashboard from '../screens/TeacherDashboard';
import AddTeacherScreen from '../screens/AddTeacherScreen';
import UpdateTeacherScreen from '../screens/UpdateTeacherScreen';

const Stack = createNativeStackNavigator();

export default function TeacherStackNavigator({ navigation }) {
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
