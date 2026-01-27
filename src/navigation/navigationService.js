// Global navigation service to handle navigation from anywhere in the app
let navigationRef = null;
let navigationReady = false;

export const setNavigationRef = (ref) => {
  console.log('🚀 Setting navigation ref...');
  navigationRef = ref;
  navigationReady = true;
  console.log('🚀 Navigation ref set globally - READY', ref?.current ? '✅' : '❌');
};

export const resetNavigationService = () => {
  console.log('🔄 Resetting navigation service');
  navigationRef = null;
  navigationReady = false;
};

export const isNavigationReady = () => {
  const ready = navigationReady && navigationRef?.current;
  console.log('⏳ Is navigation ready?', ready);
  return ready;
};

const getCurrentRoute = () => {
  const state = navigationRef?.current?.getRootState();
  if (!state) return null;
  
  let route = state.routes[state.index];
  
  while (route.state) {
    route = route.state.routes[route.state.index];
  }
  
  return route?.name;
};

export const navigate = (name, params) => {
  console.log('📍 Navigate called:', name);
  console.log('🔍 navigationRef:', navigationRef ? '✅ exists' : '❌ null');
  console.log('🔍 navigationRef.current:', navigationRef?.current ? '✅ exists' : '❌ null');
  
  if (!navigationRef?.current) {
    console.warn('❌ Navigation ref is null, retrying in 300ms...');
    setTimeout(() => navigate(name, params), 300);
    return;
  }

  try {
    const currentRoute = getCurrentRoute();
    console.log('➡️ Current route:', currentRoute, '-> Target route:', name);
    
    // If we're already at the target route, don't navigate
    if (currentRoute === name) {
      console.log('✅ Already at', name);
      return;
    }
    
    navigationRef.current.navigate(name, params);
    console.log('✅ Navigated to:', name);
  } catch (error) {
    console.error('❌ Navigation error:', error);
    console.error('❌ Error message:', error.message);
    setTimeout(() => navigate(name, params), 300);
  }
};

export const goHome = () => {
  console.log('🏠 Going home');
  navigate('HOME');
};

export const goBack = () => {
  console.log('⬅️ Going back');
  if (!navigationRef?.current) {
    console.warn('❌ Navigation ref is null');
    return;
  }

  try {
    if (navigationRef.current.canGoBack()) {
      navigationRef.current.goBack();
    } else {
      console.log('⬅️ Cannot go back, at root');
    }
  } catch (error) {
    console.error('❌ Go back error:', error);
  }
};
