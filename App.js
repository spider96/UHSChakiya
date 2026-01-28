import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { AuthProvider } from './src/auth/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { setNavigationRef } from './src/navigation/navigationService';

export default function App() {
  const navigationRef = useRef(null);
  const routeNameRef = useRef(null);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        
        <PaperProvider>
          {/* <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}> */}
          <NavigationContainer
            ref={navigationRef}
            fallback={null}
            onReady={() => {
              console.log('🎯 NavigationContainer onReady called');
              setNavigationRef(navigationRef);
              routeNameRef.current =
                navigationRef.current?.getCurrentRoute()?.name;
            }}
            onStateChange={state => {
              const getCurrentRouteName = navState => {
                if (!navState) {
                  return null;
                }
                const route = navState.routes[navState.index];

                // Recursively find the active route
                if (route.state) {
                  return getCurrentRouteName(route.state);
                }

                return route.name;
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
           {/* </SafeAreaView> */}
        </PaperProvider>
       
      </SafeAreaProvider>
    </AuthProvider>
  );
}
