import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as loginAction from "../store/actions/loginActions";
import { login, logout, register } from '../store/axios';


export const Login = (email, password) => {
  const dispatch = useDispatch();
  
  const fetchData = async () => {
    dispatch(loginAction.login({email: email, password: password}));
    const response = await login(email, password);
    if(response.status === 200){
      dispatch(loginAction.loginSuccess({email: email, password: password}));
    }else{
      dispatch(loginAction.loginFailure({email: '', password: ''}));
    }
    
  };
  useEffect(() => {
    fetchData();
  }, []);
  
}

export const Logout = (info) => {
  const dispatch = useDispatch();
  
  const fetchData = async () => {
    dispatch(loginAction.logout());
    const response = await logout(info);
    if(response.status === 200){
      dispatch(loginAction.logoutSuccess());
    }else{
      dispatch(loginAction.logoutFailure());
    }
    
  };
  useEffect(() => {
    fetchData();
  }, []);
  
}

export const Register = (info) => {
  const dispatch = useDispatch();
  
  const fetchData = async () => {
    dispatch(loginAction.register(info));
    const response = await register(info);
    if(response.status === 200){
      dispatch(loginAction.registerSuccess(info));
    }else{
      dispatch(loginAction.registerFailure());
    }
    
  };
  useEffect(() => {
    fetchData();
  }, []);
  
}
