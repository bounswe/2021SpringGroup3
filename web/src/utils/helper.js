import * as loginAction from "../store/actions/loginActions";
import { login, logout, register, createCommunity, getCommunities } from '../store/axios';

export const Login = async (info, dispatch) => {

    dispatch(loginAction.login(info));
    const response = await login(info);
    if(response.status === 200 || response.status === 201){
      dispatch(loginAction.loginSuccess(response));
    }else{
      dispatch(loginAction.loginFailure({email: '', password: ''}));
    }
}

export const Logout = async (info, dispatch) => {
  dispatch(loginAction.logout());
  const response = await logout(info);
  if(response.status === 200 || response.status === 201){
     dispatch(loginAction.logoutSuccess());
  }else{
    dispatch(loginAction.logoutFailure());
  }
}

export const Register = async (info, dispatch) => {
    dispatch(loginAction.register(info));
    const response = await register(info);
    if(response.status === 200 || response.status === 201){
      dispatch(loginAction.registerSuccess(info));
    }else{
      dispatch(loginAction.registerFailure());
    }
}

export const CreateCommunity = async (info, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await createCommunity(info);
  if(response.status === 200 || response.status === 201){
    console.log(response.data.community.id);
    return response.data.community.id;
    //  dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const GetCommunities = async (info, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await getCommunities(info);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response.data
    //  dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const GetCommunityPage = async (info, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await getCommunityPage(info);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response.data
    //  dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}