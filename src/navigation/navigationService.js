// navigationService.js
import { CommonActions, StackActions } from '@react-navigation/native';

let _navigator = null;
let _retryTimeout = null;

/**
 * Sets the active navigation reference.
 * Called by NavigationContainer's ref and onReady.
 */
export const setNavigationRef = (ref) => {
  if (ref && ref.current) {
    _navigator = ref;
    console.log('✅ Navigation Service: Ref Synchronized');
  }
};

/**
 * Completely clears the reference. 
 * Use this in useEffect cleanup of App.js
 */
export const resetNavigationService = () => {
  console.log('🔄 Navigation Service: Resetting');
  if (_retryTimeout) clearTimeout(_retryTimeout);
  _navigator = null;
};

/**
 * Navigate to a specific route
 */
export const navigate = (name, params) => {
  // Check if the navigator exists AND if the internal state is ready
  if (_navigator?.current && typeof _navigator.current.isReady === 'function' && _navigator.current.isReady()) {
    
    // Safety: Check current route to avoid double navigation
    const state = _navigator.current.getRootState();
    const currentRoute = getActiveRouteName(state);
    
    if (currentRoute === name) {
      console.log(`ℹ️ Already on ${name}, skipping.`);
      return;
    }

    _navigator.current.navigate(name, params);
    console.log(`🚀 Navigated to: ${name}`);
  } else {
    console.warn(`⏳ Navigation not ready for ${name}. Retrying...`);
    if (_retryTimeout) clearTimeout(_retryTimeout);
    _retryTimeout = setTimeout(() => navigate(name, params), 200);
  }
};

/**
 * Helper to find the current active route name in the state tree
 */
const getActiveRouteName = (state) => {
  if (!state || !state.routes) return null;
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export const goHome = () => navigate('HOME');

export const goBack = () => {
  if (_navigator?.current?.canGoBack()) {
    _navigator.current.goBack();
  } else {
    console.log('⬅️ Back action ignored: At stack root');
  }
};

// Bonus: Reset the stack (Useful for Logout)
export const resetToLogin = () => {
  if (_navigator?.current) {
    _navigator.current.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'LOGIN' }],
      })
    );
  }
};