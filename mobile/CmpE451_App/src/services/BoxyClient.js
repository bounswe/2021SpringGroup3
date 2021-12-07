import {getToken} from './asyncStorageService';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';
import ToastAndroid from 'react-native';

export const createPost = async body => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', await getToken());
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify(body);
  console.log(body);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  return fetch(
    BASE_URL + 'posts?communityId=' + PAGE_VARIABLES.communityId,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));
};

export const getPostTypeDetail = async ({communityId, postTypeId}) => {
  var myHeaders = new Headers();
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Authorization', await getToken());

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    'https://api.cmpegroupthree.store/post-types/detail?communityId=' +
      communityId +
      '&postTypeId=' +
      postTypeId,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));
};

export const getCommunities = async ({
  isMember = false,
  isModerator = false,
}) => {
  return fetch(
    BASE_URL +
      'communities' +
      (isMember ? '?isMember=' + isMember : '?isModerator=' + isModerator),
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
      },
    },
  )
    .then(async response => {
      const status = response.status;
      response = await response.json();
      if (status === 200) {
        return response;
      } else {
        ToastAndroid.show(response.message, ToastAndroid.SHORT);
      }
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};