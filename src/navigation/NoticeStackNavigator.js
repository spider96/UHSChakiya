import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NoticeScreen from '../screens/NoticeScreen';
import AddNoticeScreen from '../screens/AddNoticeScreen';

const Stack = createNativeStackNavigator();

export default function NoticeStackNavigator({ navigation }) {
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
