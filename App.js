import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthContext, AuthProvider } from './src/auth/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { setNavigationRef,resetNavigationService } from './src/navigation/navigationService';

export default function App() {
  const navigationRef = useRef(null);
  const routeNameRef = useRef(null);

  // Helper function to extract the active route name from the state
  const getActiveRouteName = (state) => {
    if (!state || !state.routes) return null;
    const route = state.routes[state.index];
    if (route.state) {
      return getActiveRouteName(route.state);
    }
    return route.name;
  };

  // useEffect(() => {
  //   console.log('📱 App component mounted');
  //   return () => {
  //     console.log('📱 App component unmounted');
  //     resetNavigationService();
  //   };
  // }, []);

  return (
    <AuthProvider>
      <SafeAreaProvider>
        
        <PaperProvider>
          {/* <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}> */}
          <NavigationContainer
            ref={navigationRef}
            onReady={() => {
              console.log('🎯 NavigationContainer onReady');
              // Sync the ref to the service immediately
              setNavigationRef(navigationRef);
              
              // Initialize current route name
              const state = navigationRef.current?.getRootState();
              routeNameRef.current = getActiveRouteName(state);
            }}
            onStateChange={() => {
              const previousRouteName = routeNameRef.current;
              const state = navigationRef.current?.getRootState();
              const currentRouteName = getActiveRouteName(state);

              if (previousRouteName !== currentRouteName) {
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