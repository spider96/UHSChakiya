# Navigation Quick Reference

## For Developers - How to Navigate

### Basic Navigation Patterns

#### Navigate to a screen within the same stack
```javascript
// From StudentDashboard to ADD_STUDENT (same StudentStackNavigator)
navigation.navigate('ADD_STUDENT')
```

#### Go back to previous screen
```javascript
// From ADD_STUDENT back to StudentDashboard
navigation.pop()
```

#### Navigate to a different stack (from side menu)
```javascript
// From StudentDashboard to TeacherDashboard
// Use side menu or: navigation.navigate('TEACHERS')
```

#### Go to HOME from nested stack
```javascript
// From AttendanceStatsScreen (nested in AttendanceStackNavigator)
// to HOME (in MainNavigator)
navigation.getParent().navigate('HOME')
```

### Common Screen Navigation Examples

#### From StudentDashboard
```javascript
// Go to add student form
onPress={() => navigation.navigate('ADD_STUDENT')}

// Go to student list
onPress={() => navigation.navigate('StudentList')}

// Go back
onPress={() => navigation.pop()}
```

#### From Add/Edit Screens
```javascript
// After successful submit
navigation.pop()  // Returns to dashboard

// On cancel
navigation.pop()  // Returns to dashboard
```

#### From Attendance Screens
```javascript
// From AttendanceDashboard to mark attendance
onPress={() => navigation.navigate('MARK_ATTENDANCE')}

// From MarkAttendanceScreen back to dashboard
navigation.pop()

// From MarkAttendanceScreen directly to HOME (skip dashboard)
navigation.getParent().navigate('HOME')
```

#### From Side Menu
```javascript
// Already handled by MainNavigatorWithLayout
// Just pass the route name: 'STUDENTS', 'TEACHERS', 'NOTICES', etc.
```

## Screen Route Names Reference

### Root Routes (MainNavigator)
- `HOME` - Home screen with dashboard
- `STUDENTS` - Student management stack
- `TEACHERS` - Teacher management stack
- `NOTICES` - Notice management stack
- `ACADEMIC_REPORT` - Academic reports stack
- `ATTENDANCE` - Attendance management stack
- `PROFILE` - User profile

### StudentStackNavigator Routes
- `StudentDashboardScreen` - Main dashboard
- `StudentList` - List of all students
- `ADD_STUDENT` - Add new student form
- `StudentDetail` - Student details view

### TeacherStackNavigator Routes
- `TeacherDashboardScreen` - Main dashboard
- `ADD_TEACHER` - Add new teacher form
- `UPDATE_TEACHER` - Update teacher profile form

### NoticeStackNavigator Routes
- `NoticeListScreen` - List of notices
- `ADD_NOTICE` - Add notice form
- `EDIT_NOTICE` - Edit notice form

### AcademicReportStackNavigator Routes
- `AcademicReportDashboardScreen` - Main dashboard
- `NOTICES_FROM_ACADEMIC` - Notice management (nested)
- `ATTENDANCE_FROM_ACADEMIC` - Attendance management (nested)

### AttendanceStackNavigator Routes
- `AttendanceDashboardScreen` - Main dashboard
- `MARK_ATTENDANCE` - Mark attendance form
- `VIEW_ATTENDANCE` - View attendance records
- `ATTENDANCE_STATS` - Attendance statistics

## How Back Button Works

### Normal Stack Behavior
```
HomeContent
    ↓ (user navigates)
StudentDashboard
    ↓ (user navigates)
ADD_STUDENT
    ↓ (user presses back or navigation.pop())
StudentDashboard
    ↓ (user presses back or menu)
HomeContent
```

### Nested Stack Behavior (Academic Report)
```
AcademicReportDashboard
    ↓
AttendanceStackNavigator
    ↓
MARK_ATTENDANCE
    ↓ (back from nested stack)
AttendanceDashboardScreen
    ↓ (back from nested stack)
AcademicReportDashboard
```

## Screen Parameter Passing (If Needed)

```javascript
// Passing parameters when navigating
navigation.navigate('StudentDetail', { studentId: 123 })

// Receiving in destination screen
export default function StudentDetailScreen({ route }) {
  const { studentId } = route.params;
  // ...
}
```

## Common Mistakes to Avoid

❌ **Wrong**: Using old `onNavigate('STUDENTS')` pattern
✅ **Right**: Using `navigation.navigate('STUDENTS')`

❌ **Wrong**: Trying to pop when there's nothing in stack
✅ **Right**: Check stack depth or use conditional navigation

❌ **Wrong**: Using `navigation.navigate('HOME')` from within nested stack
✅ **Right**: Using `navigation.getParent().navigate('HOME')`

❌ **Wrong**: Rendering Header and SideMenu inside each screen
✅ **Right**: They're managed by MainNavigatorWithLayout (persist automatically)

## Context Integration

The `useNavigation()` hook is available in any component rendered by React Navigation:

```javascript
import { useNavigation } from '@react-navigation/native';

export function MyComponent() {
  const navigation = useNavigation();
  
  return (
    <TouchableOpacity onPress={() => navigation.navigate('STUDENTS')}>
      <Text>Go to Students</Text>
    </TouchableOpacity>
  );
}
```

## Debugging Tips

### View Current Navigation State
```javascript
// In any component with navigation prop
console.log(navigation.getState());
```

### Check Stack Navigation History
```javascript
// Returns true if you can go back
navigation.canGoBack()
```

### Get Current Screen Name
```javascript
const route = useRoute();
console.log(route.name); // Current screen name
```

### Listen for Route Changes
```javascript
const navigation = useNavigation();

React.useEffect(() => {
  const unsubscribe = navigation.addListener('focus', () => {
    // Screen is focused
  });
  
  return unsubscribe;
}, [navigation]);
```
