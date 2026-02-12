// ../components/Dropdown.js
import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown'; // Ensure { } braces are here!

const DropdownComponent = ({ data, placeholder, value, onChange, labelField = "label", valueField = "value",disable,error }) => {
  return (
    <Dropdown
      disable={disable}
      // Combine styles: default + conditional error style + conditional disabled style
      style={[
        styles.dropdown,
        error && styles.inputError, // 👈 Apply red border if error is true
        disable && styles.disabled
      ]}
      placeholderStyle={[
        styles.placeholderStyle,
        disable && styles.disabledText,
      ]}
      selectedTextStyle={[
        styles.selectedTextStyle,
        disable && styles.disabledText,
      ]}
      data={data}
      maxHeight={300}
      labelField={labelField}
      valueField={valueField}
      placeholder={placeholder}
      value={value}
      onChange={item => onChange(item[valueField])}
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    height: 44,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 12,
   // paddingVertical: 10,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#F9F9F9',
  },
  placeholderStyle: { fontSize: 14, color: '#999' },
  selectedTextStyle: { fontSize: 14, color: '#333' },
  inputError: {
    borderColor: '#FF0000', // Red color for errors
    borderWidth: 1,
  },
  disabled: {
    backgroundColor: '#E9EEF5',
    borderColor: '#C4CEDB',
  },
  disabledText: {
    color: '#5F6B7A',
  },
});
