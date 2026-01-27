# Navigation Flow Diagram

## Complete Navigation Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         App.js                              │
│   (NavigationContainer + AuthProvider + PaperProvider)      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────┐
        │      AppNavigator              │
        │  (Auth Check)                  │
        └────────┬───────────────────────┘
                 │
      ┌──────────┴──────────┐
      │                     │
      ▼ (No Token)         ▼ (Has Token)
  AuthNavigator    MainNavigatorWithLayout
  ├─ LoginScreen   ├─ Header (Fixed)
  └─...            ├─ MainNavigator (Stack)
                   │   ├─ HOME
                   │   ├─ STUDENTS ─→ StudentStackNavigator
                   │   ├─ TEACHERS ─→ TeacherStackNavigator
                   │   ├─ NOTICES ──→ NoticeStackNavigator
                   │   ├─ ACADEMIC_REPORT ─→ AcademicReportStackNavigator
                   │   │   ├─ NOTICES_FROM_ACADEMIC ─→ NoticeStackNavigator
                   │   │   └─ ATTENDANCE_FROM_ACADEMIC ─→ AttendanceStackNavigator
                   │   ├─ ATTENDANCE ─→ AttendanceStackNavigator
                   │   └─ PROFILE
                   └─ SideMenu (Fixed Overlay)
```

## Menu Navigation Flow

```
┌──────────────────────────┐
│    Side Menu Open        │
│  (Click "Students")      │
└───────────┬──────────────┘
            │
            ▼
    onNavigate('STUDENTS')
            │
            ▼
MainNavigatorWithLayout.handleMenuNavigation()
            │
            ▼
  navigation.navigate('STUDENTS')
            │
            ▼
┌──────────────────────────────────┐
│   StudentStackNavigator          │
│  ┌──────────────────────────┐    │
│  │ StudentDashboardScreen   │    │
│  └──────────────────────────┘    │
└──────────────────────────────────┘
```

## In-Stack Navigation Flow (Student Example)

```
┌──────────────────────┐
│ StudentDashboard     │
│ [Add Student Button] │
└──────────┬───────────┘
           │
    navigation.navigate('ADD_STUDENT')
           │
           ▼
┌──────────────────────┐
│ ADD_STUDENT Screen   │
│ [Cancel] [Save]      │
└──────────┬───────────┘
           │
           │ (Save clicked)
           │ navigation.pop()
           ▼
┌──────────────────────┐
│ StudentDashboard     │
│ (Back in history)    │
└──────────────────────┘
```

## Back Navigation From Nested Stacks

```
MainNavigator
│
├─ HOME
│
├─ ACADEMIC_REPORT (Stack A)
│  │
│  └─ AcademicReportDashboard
│     │
│     navigation.navigate('ATTENDANCE_FROM_ACADEMIC')
│     │
│     ▼
│     AttendanceStackNavigator (Stack B - Nested)
│     │
│     ├─ AttendanceDashboardScreen
│     │  │
│     │  navigation.navigate('MARK_ATTENDANCE')
│     │  │
│     │  ▼
│     ├─ MarkAttendanceScreen
│     │
│     (User presses back)
│     │
│     ▼ navigation.pop()
│     │
│     ├─ AttendanceDashboardScreen
│     │
│     (User presses back)
│     │
│     ▼ navigation.pop() → exits Stack B
│     │
│     ├─ AcademicReportDashboard (Back in Stack A)
│
└─ ...

OR

If user is in MARK_ATTENDANCE and wants to go HOME directly:
  navigation.getParent().navigate('HOME')
  │
  └─ Exits both Stack A and Stack B
     Navigates to HOME in MainNavigator
```

## State Flow with Side Menu

```
┌─────────────────────────┐
│ MainNavigatorWithLayout │
│  (isMenuOpen: false)    │
└────────┬────────────────┘
         │
         │ User presses Menu Button
         │
         ▼
┌─────────────────────────┐
│ MainNavigatorWithLayout │
│  (isMenuOpen: true)     │
│      [SideMenu shown]   │
└────────┬────────────────┘
         │
         │ User clicks "STUDENTS"
         │ handleMenuNavigation('STUDENTS')
         │
         ▼
┌─────────────────────────┐
│ MainNavigatorWithLayout │
│  (isMenuOpen: false)    │   navigation.navigate('STUDENTS')
│  + MainNavigator        │
│    + StudentStack       │   ← Shows StudentDashboard
└─────────────────────────┘
```

## Screen Lifecycle with Navigation

```
Screen A ─────────────────────────────────────────┐
    │                                              │
    │ navigation.navigate('B')                     │
    ▼                                              │
┌─────────────────────────────────────────────┐   │
│ Screen A: onBlur (if listener added)        │   │
└─────────────────────────────────────────────┘   │
                                                  │
                    Screen B ◄────────────────────┘
                        │
                        ▼
                    ┌──────────────────────────┐
                    │ Screen B: onFocus        │
                    │ (render + useEffect)     │
                    └──────────────────────────┘
                        │
                        │ navigation.pop()
                        ▼
                    ┌──────────────────────────┐
                    │ Screen B: cleanup        │
                    │ (useEffect cleanup)      │
                    └──────────────────────────┘
                        │
                        ▼
                    Screen A (onFocus again)
```

## Role-Based Access Control (Future Enhancement)

```
If implementing role-based menu:

┌─────────────────────────────────┐
│   MainNavigatorWithLayout       │
│   (user.role check)             │
└────────────┬────────────────────┘
             │
    ┌────────┴──────────┬─────────┐
    │                   │         │
    ▼                   ▼         ▼
  ADMIN            TEACHER      VIEWER
  ├─Students       ├─Profile     ├─Profile
  ├─Teachers       ├─Notices     ├─Academic
  ├─Notices        └─Attendance  └─Attendance
  └─Reports
```

## Error Handling Flow

```
Screen Component
    │
    ├─ Try to navigate
    │   navigation.navigate('INVALID_SCREEN')
    │   ├─ React Navigation catches error
    │   └─ Navigation fails silently (in development)
    │
    └─ Handle with try-catch
        try {
          navigation.navigate(screen);
        } catch (error) {
          console.error('Navigation failed', error);
        }
```
