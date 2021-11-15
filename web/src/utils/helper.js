import * as loginAction from "../store/actions/loginActions";
import { login, logout, register } from '../store/axios';

export const Login = async (info, dispatch) => {

    dispatch(loginAction.login(info));
    const response = await login(info);
    if(response.status === 200){
      dispatch(loginAction.loginSuccess(response));
    }else{
      dispatch(loginAction.loginFailure({email: '', password: ''}));
    }
}

export const Logout = async (info, dispatch) => {
  dispatch(loginAction.logout());
  const response = await logout(info);
  if(response.status === 200){
    dispatch(loginAction.logoutSuccess());
  }else{
    dispatch(loginAction.logoutFailure());
  }
}

export const Register = async (info, dispatch) => {
    dispatch(loginAction.register(info));
    const response = await register(info);
    if(response.status === 200){
      dispatch(loginAction.registerSuccess(info));
    }else{
      dispatch(loginAction.registerFailure());
    }
}
