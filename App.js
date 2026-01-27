import React, { useRef, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/auth/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { setNavigationRef, resetNavigationService } from './src/navigation/navigationService';

export default function App() {
  const navigationRef = useRef(null);
  const routeNameRef = useRef(null);

  useEffect(() => {
    console.log('📱 App component mounted');
    return () => {
      console.log('📱 App component unmounted');
      // Reset navigation service when app unmounts
      resetNavigationService();
    };
  }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PaperProvider>
          <NavigationContainer 
            ref={navigationRef}
            fallback={null}
            onReady={() => {
              console.log('🎯 NavigationContainer onReady called');
              setNavigationRef(navigationRef);
              routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
            }}
            onStateChange={() => {
              const state = navigationRef.current?.getRootState();
              
              const getCurrentRouteName = (state) => {
                const route = state?.routes[state?.index];
                
                if (route?.state) {
                  return getCurrentRouteName(route.state);
                }
                
                return route?.name;
              };
              
              const currentRouteName = getCurrentRouteName(state);
              
              if (routeNameRef.current !== currentRouteName) {
                console.log('📊 Navigation state changed:', currentRouteName);
                routeNameRef.current = currentRouteName;
              }
            }}
          >
            <AppNavigator navigationRef={navigationRef} />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}
