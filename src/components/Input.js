import React from 'react';
import { TextInput } from 'react-native';

export default function Input(props) {
  return (
    <TextInput
      style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      {...props}
    />
  );
}
