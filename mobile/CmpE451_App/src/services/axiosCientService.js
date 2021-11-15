import {AsyncStorage} from 'react-native';
import {KEYS} from '../constants';
import axios from 'axios';

export const BASER_URL = 'https://api.cmpegroupthree.store/';

export const AXIOS_CLIENT = axios.create({
  baseURL: BASER_URL,
  timeout: 30000,
  headers: {'X-Platform': 'ANDROID'},
});

AXIOS_CLIENT.interceptors.request.use(async config => {
  config.headers['X-Platform'] = 'ANDROID';
  const token = await AsyncStorage.getItem(KEYS.TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
