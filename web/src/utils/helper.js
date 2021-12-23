import * as loginAction from "../store/actions/loginActions";
import { login, logout, register, getHomePagePosts,
  createCommunity, getCommunities, getCommunityPage,
  leaveCommunity, joinCommunity, joinCommunityModerator,
  acceptUser, rejectUser, acceptModerator, rejectModerator, kickUser, deleteCommunity,
  createPost, getCommunityPosts, getPostPage,
  createPostType, getPostTypes, getPostTypeDetail, getProfile,
  getProfileSettings,
  postProfileSettings, 
  getProfileOther } from '../store/axios';

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

export const GetHomePagePosts = async (token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await getHomePagePosts(token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data.community.id);
    return response.data.community.id;
    //  dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const CreateCommunity = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await createCommunity(info, token);
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

export const GetPostTypes = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await getPostTypes(info, token);
  if(response.status === 200 || response.status === 201){
    return response;
    //  dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const GetPostTypeDetail = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await getPostTypeDetail(info, token);
  if(response.status === 200 || response.status === 201){
    return response;
    //  dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const GetCommunities = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await getCommunities(info, token);
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
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const LeaveCommunity = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await leaveCommunity(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const JoinCommunity = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await joinCommunity(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const JoinCommunityModerator = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await joinCommunityModerator(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const AcceptUser = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await acceptUser(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const RejectUser = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await rejectUser(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const AcceptModerator = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await acceptModerator(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const RejectModerator = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await rejectModerator(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const KickUser = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await kickUser(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const DeleteCommunity = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await deleteCommunity(info, token);
  if(response.status === 200 || response.status === 201){
    console.log(response.data);
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const CreatePost = async (info, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await createPost(info.body, info.token);
  if(response.status === 200 || response.status === 201){
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const GetCommunityPosts = async (info, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await getCommunityPosts(info);
  if(response.status === 200 || response.status === 201){
    console.log(response.data)
    return response
    // dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}

export const GetPostPage = async (info, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await getPostPage(info);
  if(response.status === 200 || response.status === 201){
    console.log(response.data)
    return response
    // dispatch(loginAction.logoutSuccess());
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

export const GetProfileOtherPage = async (info, dispatch) => {
  const response = await getProfileOther(info);
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

export const PostProfileSettings = async (info, token, dispatch) => {
  // dispatch(loginAction.logout());
  const response = await postProfileSettings(info, token);
  if(response.status === 200 || response.status === 201){
    return response;
    //  dispatch(loginAction.logoutSuccess());
  }else{
    // dispatch(loginAction.logoutFailure());
    return {}
  }
}