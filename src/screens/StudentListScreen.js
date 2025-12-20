import React from 'react';
import { View, Button } from 'react-native';

export default function StudentListScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Add Student"
        onPress={() => navigation.navigate('AddStudent')} // ✅ NOW WORKS
      />
    </View>
  );
}
