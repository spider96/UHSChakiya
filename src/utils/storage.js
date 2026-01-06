import AsyncStorage from '@react-native-async-storage/async-storage';

//export const saveUser = user => AsyncStorage.setItem('user', user);
//export const getUser = () => AsyncStorage.getItem('user');
//export const removeUser = () => AsyncStorage.removeItem('user');

export const saveUser = async (userObject) => {
  try {
    // ERROR WAS HERE: You cannot save the object directly.
    // We must turn the Object {name: '...'} into a String "{'name': '...'}"
    const jsonValue = JSON.stringify(userObject);
    await AsyncStorage.setItem('user', jsonValue);
  } catch (e) {
    console.error("Error saving to storage:", e);
  }
};

// 2. GET DATA
export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    console.log("Retrieved from storage:", jsonValue);
    // Convert the String back into a Javascript Object so your app can use it
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error reading from storage:", e);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.error("Error removing storage:", e);
  }
};
