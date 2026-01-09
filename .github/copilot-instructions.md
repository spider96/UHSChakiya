# Copilot Instructions for UHSChakiya School Management UI

## Project Overview
UHSChakiya is a **React Native school management application** with role-based access control (Admin, Teacher, Viewer, Guest). It uses a mobile-first architecture with navigation stacks for authenticated/unauthenticated flows.

## Architecture

### Core Data Flow
1. **Authentication**: `LoginScreen` → `authService.loginApi()` → stores user/token via `AsyncStorage`
2. **API Layer**: All requests go through `apiClient.js` (axios interceptor adds Bearer token automatically)
3. **State Management**: `AuthContext` (React Context) holds user state and persists across app restarts
4. **Navigation**: Conditional routing in `AppNavigator.js` shows `AuthNavigator` (login) or main tabs based on token presence

### Directory Structure
- **`src/auth/`**: Authentication context and login API calls
- **`src/api/`**: `apiClient.js` configures axios with baseURL and request interceptor
- **`src/services/`**: Business logic services (`studentService.js`, etc.) that use `apiClient`
- **`src/screens/`**: Screen components (each maps to a route)
- **`src/navigation/`**: Navigation stacks and route configuration
- **`src/constants/`**: `roles.js` defines USER_ROLES and ROLE_PERMISSIONS
- **`src/utils/`**: `storage.js` handles AsyncStorage with JSON serialization
- **`src/components/`**: Reusable UI components (Button, Input, Field, etc.)

## Critical Patterns & Conventions

### 1. **AsyncStorage Data Serialization**
Always use `JSON.stringify()` when saving and `JSON.parse()` when retrieving. See [storage.js](src/utils/storage.js):
```javascript
const jsonValue = JSON.stringify(userObject);
await AsyncStorage.setItem('user', jsonValue);
return jsonValue != null ? JSON.parse(jsonValue) : null;
```

### 2. **API Client with Token Injection**
`apiClient.js` interceptor automatically adds Bearer token to all requests:
```javascript
apiClient.interceptors.request.use(async config => {
  const user = await getUser();
  const token = user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```
**Never manually add Authorization header** — it's injected automatically.

### 3. **Role-Based Permissions**
Use `USER_ROLES` and `ROLE_PERMISSIONS` from `constants/roles.js`. Admin has CRUD, Teacher has CRU, Viewer has R only:
```javascript
import { ROLE_PERMISSIONS } from '../constants/roles';
const canEdit = ROLE_PERMISSIONS[userRole].includes('update');
```

### 4. **Service Layer Pattern**
Each domain has a service file (e.g., `studentService.js`) with functions that call `apiClient`:
```javascript
export const getStudents = async () => {
  const res = await apiClient.get('/students');
  return res.data;
};
```
All services use `apiClient` — never use axios directly elsewhere.

### 5. **Navigation Conditional Routing**
`AppNavigator.js` checks token presence to route to auth or main flow. When login succeeds, `AuthContext.login()` updates state and navigation automatically switches.

## Common Workflows

### Adding a New Screen
1. Create component in `src/screens/`
2. Import in appropriate navigator (e.g., `StudentStackNavigator.js`)
3. Add route: `<Stack.Screen name="ScreenName" component={ScreenComponent} />`
4. Handle navigation: `navigation.navigate('ScreenName')`

### Adding a New API Endpoint
1. Create service function in `src/services/` (or extend existing)
2. Use `apiClient.get/post/put/delete()` — token is injected automatically
3. Return `res.data`
4. Call from screen and handle loading/error states

### Authentication Flow
1. User enters credentials in `LoginScreen`
2. Call `loginApi()` from `authService.js`
3. Call `login(userData)` from `AuthContext` — stores token and user object
4. Navigation automatically switches to main app (handled in `AppNavigator.js`)

## Key Dependencies & Configuration

- **React Native 0.83.1** with Expo-free setup
- **React Navigation 7.x**: Stack, Native-Stack, Bottom-Tabs navigators
- **Axios 1.13.2**: HTTP client with request interceptor
- **AsyncStorage**: Token/user persistence (requires JSON serialization)
- **Roles**: Defined in constants, not fetched from API
- **API Base URL**: Currently `http://192.168.31.227:8080/api` (see `apiClient.js` for dev environment)

## Development Notes

- **Metro bundler**: Runs on `npm start`
- **Node requirement**: 20+
- **iOS**: Requires `bundle install && bundle exec pod install` for CocoaPods
- **Linting**: `npm run lint` (ESLint configured)
- **Testing**: `npm run test` (Jest configured)
- **Fast Refresh**: Changes auto-reload in dev mode

## Important Gotchas

1. **Token Persistence**: Token must be in the user object stored in AsyncStorage. If login API returns `{ token: '...', user: {...} }`, extract and merge properly.
2. **API Base URL**: Hardcoded in `apiClient.js` — remember to update for production.
3. **No Manual Headers**: Don't add Authorization headers in screens; the interceptor handles it.
4. **Role Checking**: Always import from `constants/roles.js`, not hardcoded strings.
5. **Async Context**: `AuthContext.loading` is used to prevent rendering during app startup — check this in root navigation.
