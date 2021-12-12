var myHeaders = new Headers();
import {getToken} from '../services/asyncStorageService';
import {
  TEXT,
  PAGE_VARIABLES,
  BASE_URL,
  DEFAULT_PROFILE_IMAGE,
} from '../constants';

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
export const getMyProfile = async () => {
  var myHeaders = new Headers();
  const token = await getToken();
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Authorization', token);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };
  return fetch(BASE_URL + 'profile', requestOptions)
    .then(response => response.text())
    .then(result => {
      return JSON.parse(result);
    })
    .catch(error => {
      console.info(error.message);
    });
};
export const getCommunities = async isMember => {
  return fetch(BASE_URL + 'communities?isMember=' + isMember, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
    .then(response => response.text())
    .then(result => {
      return result;
    })
    .catch(error => {
      console.info(error.message);
    });
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
    BASE_URL +
      '/post-types/detail?communityId=' +
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

export const updateUserSettings = async body => {
  var myHeaders = new Headers();
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Authorization', await getToken());
  myHeaders.append('Content-Type', 'application/json');
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: JSON.stringify(body),
  };
  return fetch(
    'https://api.cmpegroupthree.store/profile/settings',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      return JSON.parse(result);
    })
    .catch(error => console.log('error', error));
};

export const getUserSettings = async () => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', await getToken());
  myHeaders.append('X-Platform', 'ANDROID');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(BASE_URL + 'profile/settings', requestOptions)
    .then(response => response.text())
    .then(result => {
      return JSON.parse(result);
    })
    .catch(error => console.log('error', error));
};

export const getCommunityPosts = async communityId => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', await getToken());
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Content-Type', 'application/json');

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    'https://api.cmpegroupthree.store/posts?communityId=' +
      '61929a750d87cc03bcfe53c1',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      return JSON.parse(result);
    })
    .catch(error => console.log('error', error));
};
