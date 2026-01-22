import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu } from 'react-native-paper';

export default function MaterialDropdown() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
            
          <TextInput
            label="Select Class"
            value={value}
            mode="outlined"
            editable={false}
            right={<TextInput.Icon icon="menu-down" />}
            onPressIn={() => setVisible(true)}
          />
        }
      >
        <Menu.Item onPress={() => { setValue('Class 1'); setVisible(false); }} title="Class 1" />
        <Menu.Item onPress={() => { setValue('Class 2'); setVisible(false); }} title="Class 2" />
        <Menu.Item onPress={() => { setValue('Class 3'); setVisible(false); }} title="Class 3" />
      </Menu>
    </View>
  );
}