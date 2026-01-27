import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeContent from '../screens/HomeContent';
import LoginScreen from '../screens/LoginScreen';
import StudentStackNavigator from './StudentStackNavigator';
import TeacherStackNavigator from './TeacherStackNavigator';
import NoticeStackNavigator from './NoticeStackNavigator';
import AcademicReportStackNavigator from './AcademicReportStackNavigator';
import AttendanceStackNavigator from './AttendanceStackNavigator';
import UserProfile from '../screens/UserProfile';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
        contentStyle: { backgroundColor: 'white' }
      }}
    >
      {/* Home is the root screen - entry point */}
      <Stack.Screen
        name="HOME"
        component={HomeContent}
        options={{
          animationEnabled: false,
        }}
      />

      {/* Login accessible from within the app */}
      <Stack.Screen
        name="LOGIN"
        component={LoginScreen}
        options={{
          animationEnabled: true,
        }}
      />

      {/* Student Management Stack */}
      <Stack.Screen
        name="STUDENTS"
        component={StudentStackNavigator}
        options={{
          animationEnabled: true,
        }}
      />

      {/* Teacher Management Stack */}
      <Stack.Screen
        name="TEACHERS"
        component={TeacherStackNavigator}
        options={{
          animationEnabled: true,
        }}
      />

      {/* Notice Management Stack */}
      <Stack.Screen
        name="NOTICES"
        component={NoticeStackNavigator}
        options={{
          animationEnabled: true,
        }}
      />

      {/* Academic Report Stack */}
      <Stack.Screen
        name="ACADEMIC_REPORT"
        component={AcademicReportStackNavigator}
        options={{
          animationEnabled: true,
        }}
      />

      {/* Attendance Management Stack */}
      <Stack.Screen
        name="ATTENDANCE"
        component={AttendanceStackNavigator}
        options={{
          animationEnabled: true,
        }}
      />

      {/* User Profile */}
      <Stack.Screen
        name="PROFILE"
        component={UserProfile}
        options={{
          animationEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
} 