import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function Button({ title, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: '#0A5ED7', padding: 12 }}>
      <Text style={{ color: '#fff', textAlign: 'center' }}>{title}</Text>
    </TouchableOpacity>
  );
}
