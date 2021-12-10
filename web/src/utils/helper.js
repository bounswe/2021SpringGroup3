import * as loginAction from "../store/actions/loginActions";
import { login, logout, register,
  createCommunity, getCommunities, getCommunityPage,
  createPostType, 
  getProfile,
  getProfileSettings} from '../store/axios';

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

export const CreatePostType = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await createPostType(info, token);
  if(response.status === 200 || response.status === 201){
    return response;
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
    return response
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
    return response
    //  dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const GetProfilePage = async (info, dispatch) => {
  const response = await getProfile(info);
  if(response.status === 200 || response.status === 201) {
    return response;
  } else {
    return {}
  }
}

export const GetProfileSettings = async (info, dispatch) => {
  const response = await getProfileSettings(info);
  if(response.status === 200 || response.status === 201) {
    return response;
  } else {
    return {}
  }
}