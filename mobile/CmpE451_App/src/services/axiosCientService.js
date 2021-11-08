import AsyncStorage from 'react-native';
import {KEYS} from '../constants';
import axios from 'axios';

const BASER_URL = 'https://api.boxy.com/';

export const AXIOS_CLIENT = axios.create({
  baseURL: BASER_URL,
  timeout: 30000,
});

AXIOS_CLIENT.interceptors.request.use(async config => {
  const token = await AsyncStorage.getItem(KEYS.TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
