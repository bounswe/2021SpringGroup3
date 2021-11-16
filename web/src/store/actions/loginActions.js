import {
  LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, 
  REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE, 
  LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
} from '../types'

export function login(info) {
  return {
    type: LOGIN,
    payload: info,
  };
}

export function loginSuccess(info) {
  return {
    type: LOGIN_SUCCESS,
    payload: info,
  };
}

export function loginFailure(info) {
  return {
    type: LOGIN_FAILURE,
    payload: info,
  };
}

export function register(info) {
  return {
    type: REGISTER,
    payload: info,
  };
}

export function registerSuccess(info) {
  return {
    type: REGISTER_SUCCESS,
    payload: info,
  };
}

export function registerFailure() {
  return {
    type: REGISTER_FAILURE,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailure(info) {
  return {
    type: LOGOUT_FAILURE,
  };
}