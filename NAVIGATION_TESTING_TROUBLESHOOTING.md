# Navigation Testing & Troubleshooting

## Testing Scenarios

### Test 1: Basic Navigation Flow
```javascript
// Test: Home → Students → Add Student → Back to Students → Back to Home

Steps:
1. Launch app - should show HomeContent
2. Click side menu
3. Click "Student Dashboard"
4. Verify StudentDashboard shows
5. Click "Add Student"
6. Verify AddStudentScreen shows
7. Click "Cancel"
8. Verify back at StudentDashboard
9. Use device back button
10. Verify back at HomeContent

Expected: Smooth navigation without screen jumps
```

### Test 2: Multiple Stack Navigation
```javascript
// Test: Navigate between Student and Teacher stacks

Steps:
1. Open Student Dashboard
2. Click side menu
3. Click "Teacher Dashboard"
4. Verify TeacherDashboard shows (not StudentDashboard)
5. Click side menu
6. Click "Student Dashboard"
7. Verify StudentDashboard shows

Expected: Stacks properly switch, no residual screens
```

### Test 3: Nested Stack Navigation (Academic Report)
```javascript
// Test: Navigate through nested stacks

Steps:
1. Open Academic Report
2. Click "Attendance"
3. Verify AttendanceStackNavigator loads
4. Click "Mark Attendance"
5. Click "Back"
6. Verify back at Attendance Dashboard
7. Click "Back"
8. Verify back at Academic Report Dashboard

Expected: Proper nesting with correct back navigation
```

### Test 4: Direct HOME Navigation
```javascript
// Test: Use getParent().navigate('HOME') from nested screen

Steps:
1. Open Academic Report
2. Open Attendance from Academic Report
3. Open Mark Attendance
4. Click "Home" or similar button with navigation.getParent().navigate('HOME')
5. Verify at HomeContent (skipped intermediate screens)

Expected: Direct navigation to HOME, skipping intermediate screens
```

### Test 5: Menu Persistence
```javascript
// Test: Header and SideMenu persist

Steps:
1. Navigate to Student Dashboard
2. Verify Header is visible
3. Verify menu button works
4. Navigate to different section
5. Verify Header still visible
6. Verify SideMenu still works

Expected: Header and menu always available
```

### Test 6: Logout Functionality
```javascript
// Test: Logout from any screen

Steps:
1. Navigate to any screen (e.g., Add Student)
2. Open side menu
3. Click "Logout"
4. Verify redirected to LoginScreen
5. Verify all data cleared

Expected: Clean logout from anywhere
```

## Common Issues & Solutions

### Issue 1: "Can't perform a React state update on an unmounted component"

**Cause**: Navigation happening during component unmount
```javascript
// ❌ Wrong
const handleSave = async () => {
  await saveData();
  navigation.navigate('SCREEN');
};

// ✅ Right
const handleSave = async () => {
  try {
    await saveData();
    // Use setTimeout to ensure component is still mounted
    navigation.navigate('SCREEN');
  } catch (error) {
    console.error(error);
  }
};
```

### Issue 2: Black Screen After Navigation

**Cause**: Screen component not properly registered or wrong route name

```javascript
// ✅ Check routes are properly named in navigator
<Stack.Screen name="ADD_STUDENT" component={AddStudentScreen} />

// ✅ Use exact same name when navigating
navigation.navigate('ADD_STUDENT')

// ❌ Don't use different casing
navigation.navigate('add_student')  // Wrong!
```

### Issue 3: Back Button Not Working

**Cause**: Not using proper navigation method

```javascript
// ❌ Wrong ways
const handleBack = () => {
  // Nothing - button does nothing
};

onPress={() => navigation.navigate('HOME')}  // Might push instead of pop

// ✅ Right way
const handleBack = () => {
  navigation.pop();
};

// Or for deep stacks
const handleBack = () => {
  if (navigation.canGoBack()) {
    navigation.goBack();
  } else {
    navigation.navigate('HOME');
  }
};
```

### Issue 4: Can't Go Back from Nested Stack

**Cause**: Using wrong navigation method

```javascript
// ❌ Wrong
navigation.navigate('HOME')  // Might not work from nested stack

// ✅ Right
navigation.getParent().navigate('HOME')
```

### Issue 5: Menu Navigation Not Working

**Cause**: Handler not properly connected

```javascript
// ✅ Verify in SideMenu:
<MenuLink 
  onPress={() => onNavigate('STUDENTS')}  // Calls parent handler
/>

// ✅ Verify in MainNavigatorWithLayout:
const handleMenuNavigation = (screen) => {
  setIsMenuOpen(false);
  navigation.navigate(screen);  // Uses React Navigation
};
```

### Issue 6: Route Parameters Not Passed

**Cause**: Not including route params in navigation

```javascript
// ✅ Pass params when navigating
navigation.navigate('StudentDetail', { 
  studentId: student.id,
  studentName: student.name 
})

// ✅ Receive in destination
export default function StudentDetailScreen({ route }) {
  const { studentId, studentName } = route.params;
  
  useEffect(() => {
    // Use params here
    console.log('Loading student:', studentId);
  }, [studentId]);
}
```

### Issue 7: Screen Jumps Between Dashboards

**Cause**: Screens from previous stack still in navigation history

```javascript
// ✅ Use reset instead of navigate for major transitions
navigation.reset({
  index: 0,
  routes: [{ name: 'TEACHERS' }],
});

// Or ensure proper stack isolation
// This shouldn't happen with current architecture
```

## Debugging Tools

### 1. Navigation State Logger
```javascript
// Add to any screen to debug
import { useNavigation, useRoute } from '@react-navigation/native';

export default function DebugScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  React.useEffect(() => {
    console.log('Current route:', route.name);
    console.log('Navigation state:', navigation.getState());
  }, [navigation, route]);
}
```

### 2. Screen Focus Listener
```javascript
import { useFocusEffect } from '@react-navigation/native';

export default function MyScreen() {
  useFocusEffect(
    React.useCallback(() => {
      console.log('Screen is focused');
      
      return () => {
        console.log('Screen is blurred');
      };
    }, [])
  );
}
```

### 3. Navigation Event Logging
```javascript
export default function App() {
  const navigationRef = React.useRef();

  const onNavigationStateChange = (state) => {
    console.log('New navigation state:', state);
  };

  return (
    <NavigationContainer 
      ref={navigationRef}
      onStateChange={onNavigationStateChange}
    >
      {/* ... */}
    </NavigationContainer>
  );
}
```

## Performance Optimization

### 1. Memoize Navigation Callbacks
```javascript
const handleNavigate = React.useCallback((screen) => {
  navigation.navigate(screen);
}, [navigation]);
```

### 2. Lazy Load Screens
```javascript
const StudentStackNavigator = React.lazy(() => 
  import('./StudentStackNavigator')
);
```

### 3. Keep Alive Between Navigation
```javascript
// Avoid re-fetching data when returning
export default function StudentList() {
  const [students, setStudents] = React.useState([]);
  const isFocused = useIsFocused();
  
  React.useEffect(() => {
    if (isFocused) {
      // Only fetch when screen is focused
      fetchStudents();
    }
  }, [isFocused]);
}
```

## Best Practices

✅ **DO:**
- Always use `navigation.navigate()` or `navigation.pop()` 
- Always handle navigation errors gracefully
- Use `navigation.getParent()` for parent stack access
- Keep navigation logic in screen components
- Use route params for passing data
- Test back button on Android devices
- Use consistent route naming (UPPERCASE with underscores)

❌ **DON'T:**
- Don't use `onNavigate` prop pattern (use `navigation` hook)
- Don't manually manage navigation state
- Don't nest navigators deeply (more than 2-3 levels)
- Don't forget to unsubscribe from navigation listeners
- Don't use string literals for route names (use constants)
- Don't navigate in render function
- Don't ignore useEffect cleanup

## Testing Devices

```bash
# Android
# Test back button works properly
# Test menu animations smooth
# Test no lag in navigation

# iOS
# Test gesture back works
# Test safe area handled correctly
# Test scroll views don't interfere
```

## Key Metrics to Monitor

1. **Navigation Performance**: Time to switch screens < 300ms
2. **Memory**: No memory leaks when navigating repeatedly
3. **Battery**: No excessive re-renders during navigation
4. **Stability**: No crashes when navigating with poor connection
5. **Responsiveness**: Menu opens smoothly within 200ms
