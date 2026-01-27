# Navigation Structure - UHSChakiya

## New Navigation Architecture

The app now implements proper React Navigation stack-based architecture with one stack navigator for each menu option.

### Navigation Flow

```
App.js
  └─ NavigationContainer
      └─ AuthProvider
          └─ AppNavigator
              ├─ (No Token) → AuthNavigator → LoginScreen
              └─ (Has Token) → MainNavigatorWithLayout
                  ├─ Header (persistent across all screens)
                  ├─ SideMenu (persistent overlay across all screens)
                  └─ MainNavigator (Stack Navigator)
                      ├─ HOME → HomeContent
                      ├─ STUDENTS → StudentStackNavigator
                      │   ├─ StudentDashboardScreen
                      │   ├─ StudentList
                      │   ├─ ADD_STUDENT
                      │   └─ StudentDetail
                      ├─ TEACHERS → TeacherStackNavigator
                      │   ├─ TeacherDashboardScreen
                      │   ├─ ADD_TEACHER
                      │   └─ UPDATE_TEACHER
                      ├─ NOTICES → NoticeStackNavigator
                      │   ├─ NoticeListScreen
                      │   ├─ ADD_NOTICE
                      │   └─ EDIT_NOTICE
                      ├─ ACADEMIC_REPORT → AcademicReportStackNavigator
                      │   ├─ AcademicReportDashboardScreen
                      │   ├─ NOTICES_FROM_ACADEMIC → NoticeStackNavigator
                      │   └─ ATTENDANCE_FROM_ACADEMIC → AttendanceStackNavigator
                      ├─ ATTENDANCE → AttendanceStackNavigator
                      │   ├─ AttendanceDashboardScreen
                      │   ├─ MARK_ATTENDANCE
                      │   ├─ VIEW_ATTENDANCE
                      │   └─ ATTENDANCE_STATS
                      └─ PROFILE → UserProfile
```

## Key Features

### 1. Separate Stack Navigator for Each Menu Option
- **StudentStackNavigator**: Student management flows
- **TeacherStackNavigator**: Teacher management flows
- **NoticeStackNavigator**: Notice management flows
- **AcademicReportStackNavigator**: Academic reports with nested stacks
- **AttendanceStackNavigator**: Attendance management flows

### 2. Back Navigation
- **Within a stack**: `navigation.navigate('ScreenName')` navigates to next screen
- **Back from a screen**: `navigation.pop()` goes back to previous screen in same stack
- **Back to HOME**: Use `navigation.getParent().navigate('HOME')` to go to root HOME from nested stacks

### 3. Side Menu Navigation
- Clicking menu items closes the side menu and navigates to the corresponding stack root
- Side menu persists across all screens (never unmounts)
- Navigation is handled by `handleMenuNavigation()` in MainNavigatorWithLayout

### 4. Navigation Between Stacks
- Each menu option opens its own stack at the root
- Users stay within that stack until they navigate to a different menu option
- When switching menu options, the previous stack is replaced (not nested)

## Screen Updates Made

All screen components updated to use React Navigation API:

### Navigation Props
- Screens receive `navigation` prop instead of `onNavigate`
- Uses `navigation.navigate()` for in-stack navigation
- Uses `navigation.pop()` for going back in the current stack

### Updated Screens
- `HomeContent`: Uses `navigation.navigate('NOTICES')` for notices
- `StudentDashboard`: Uses `navigation.navigate()` for ADD_STUDENT and StudentList
- `TeacherDashboard`: Uses `navigation.navigate()` for ADD_TEACHER and UPDATE_TEACHER
- `AttendanceDashboard`: Uses `navigation.navigate()` for attendance screens and `navigation.getParent().navigate('HOME')` for back
- `AcademicReportDashboard`: Uses `navigation.navigate()` for nested stacks
- `AddStudentScreen`: Uses `navigation.pop()` to return after saving
- `AddTeacherScreen`: Uses `navigation.pop()` to return after saving
- `AddNoticeScreen`: Uses `navigation.pop()` to return after saving
- `UpdateTeacherScreen`: Uses `navigation.pop()` to return after saving
- `MarkAttendanceScreen`: Uses `navigation.getParent().navigate('HOME')` after marking
- `ViewAttendanceScreen`: Uses `navigation.pop()` for back
- `AttendanceStatsScreen`: Uses `navigation.pop()` for back

## How Back Button Works

1. **Within a stack** (e.g., StudentStackNavigator):
   - Pressing back goes to the previous screen in the same stack
   - Eventually returns to the dashboard (root of that stack)

2. **At stack root**:
   - Pressing back would exit the stack (depends on Android back button handler)
   - Back buttons on dashboard screens use `navigation.pop()` to go to previous screen

3. **Returning to HOME**:
   - From AttendanceDashboard: `navigation.getParent().navigate('HOME')`
   - From other places: Use side menu or back button to navigate

## Important Notes

- The `MainLayout.js` created is for reference but not currently used (kept for future custom layout needs)
- `HomeScreen.js` is now obsolete but left in codebase (can be removed)
- Header and SideMenu persist across all authenticated screens
- No screen jumps occur - back navigation always goes to the previous screen in current stack
