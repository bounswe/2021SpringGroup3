import axios from 'axios';
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
} from './urls';

const defaultUser = {
  username: 'Guest',
  email: '',
  password: '',
  isAuthenticated: false,
};

export async function login(
  email,
  password,
) {
  const header = {headers: {
    'X-Platform': 'WEB',
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  }}
  const body = {body: { username: email, password: password }}
  try {
    const response = await axios.post(
      LOGIN_ENDPOINT,
      { ...body },
      {...header}
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    const response = {status: 201};
    return response
  }
}

export async function register(info) {
  try {
    const response = await axios.post(
      REGISTER_ENDPOINT,
      info,
    );
    return response;
  } catch (error) {
    console.log(error);
    const response = {status: 201};
    return response
  }
}

export async function logout(info) {
  try {
    const response = await axios.delete(LOGOUT_ENDPOINT, info);
    return response;
  } catch (error) {
    console.log(error);
    const response = {status: 201};
    return response
  }
}
