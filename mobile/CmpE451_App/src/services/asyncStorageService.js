import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS} from '../constants';

export const storeToken = async value => {
  try {
    await AsyncStorage.setItem(KEYS.TOKEN_KEY, value);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem(KEYS.TOKEN_KEY);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(KEYS.TOKEN_KEY);
  } catch (e) {
    return e;
  }
};
