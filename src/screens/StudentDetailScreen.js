import React from 'react';
import { View, Text } from 'react-native';

export default function StudentDetailScreen({ route }) {
  const student = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text>Name: {student.name}</Text>
    </View>
  );
}
