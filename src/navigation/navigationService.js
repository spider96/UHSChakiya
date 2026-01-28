// d:\projects\schoolMngUI\UHSChakiya\src\navigation\navigationService.js
import { CommonActions } from '@react-navigation/native';

let _navigator = null;
let _isReady = false;
let _actionQueue = [];

/**
 * Sets the top-level navigator object.
 * This should be called in `onReady` of the NavigationContainer.
 * It also processes any navigation actions that were queued before the navigator was ready.
 * @param {object} navigatorRef - The navigation container ref object from React.useRef().
 */
function setNavigationRef(navigatorRef) {
  if (navigatorRef && navigatorRef.current) {
    _navigator = navigatorRef.current;
    _isReady = true;
    
    // Process any queued actions
    if (_actionQueue.length > 0) {
        console.log(`🚀 Navigator is ready. Processing ${_actionQueue.length} queued actions.`);
        _actionQueue.forEach(action => _navigator.dispatch(action));
        _actionQueue = []; // Clear the queue
    }
  }
}

/**
 * Dispatches a navigation action. If the navigator is not ready,
 * the action is queued and will be dispatched once the navigator is set.
 * @param {function} actionCreator - A function that returns a navigation action object.
 */
function dispatch(actionCreator) {
  const action = actionCreator();
  if (_isReady && _navigator) {
    _navigator.dispatch(action);
  } else {
    _actionQueue.push(action);
    console.log('⏳ Navigation action queued. Navigator not ready yet.');
  }
}

/**
 * Navigates to a specific route.
 * @param {string} routeName - The name of the route to navigate to.
 * @param {object} [params] - Parameters to pass to the route.
 */
export function navigate(routeName, params) {
  dispatch(() => CommonActions.navigate({ name: routeName, params }));
}

/**
 * Navigates back to the home screen, resetting the stack.
 */
export function goHome() {
    dispatch(() => CommonActions.reset({
        index: 0,
        routes: [{ name: 'HOME' }],
    }));
}

/**
 * Resets the navigation service state. Should be called when the app is unmounted.
 */
export function resetNavigationService() {
  _navigator = null;
  _isReady = false;
  _actionQueue = [];
  console.log('🧹 Navigation service has been reset.');
}

// Export the functions that will be used externally, keeping the names consistent with App.js
export { setNavigationRef };
