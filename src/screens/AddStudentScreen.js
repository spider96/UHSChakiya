import React, { useState } from 'react';
import { View } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { addStudent } from '../services/studentService';

export default function AddStudentScreen({ navigation }) {

    const [student, setStudent] = useState({
    name: '',
    fatherName: '',
    className: '',
    rollNumber: '',
    active: true
  });
  
    const updateField = (field, value) => {
    setStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    await addStudent( student );
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Input label="Name" value={student.name} onChangeText={v => updateField('name', v)} />
      <Input label="Roll No" value={student.fatherName} onChangeText={v => updateField('fatherName', v)} />
      <Input label="Class" value={student.className} onChangeText={v => updateField('className', v)} />
      <Input label="DOB" value={student.rollNumber} onChangeText={v => updateField('rollNumber', v)} />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}
