import React, { useState, useContext ,StyleSheet} from 'react';
import { View } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { loginApi } from '../auth/authService';
import { AuthContext } from '../auth/AuthContext';

export default function LoginScreen({onNavigate,onLoginSuccess}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    const userData = await loginApi(username, password);
    await login(userData);
    onLoginSuccess(userData);
    onNavigate('HOME');
  };

  return (
    <View style={{ padding: 20 }}>
      <Input style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
      <Input style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );  
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginBottom: 15,
    bordercolor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});