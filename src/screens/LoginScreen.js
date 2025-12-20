import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginApi } from '../auth/authService';
import { AuthContext } from '../auth/AuthContext';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const token = await loginApi(username, password);
    await login(token);
  };

  return (
    <View style={{ padding: 20 }}>
      <Input placeholder="Username" value={username} onChangeText={setUsername} />
      <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
