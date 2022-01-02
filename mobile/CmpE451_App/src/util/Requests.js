import {getToken} from '../services/asyncStorageService';
import {
  TEXT,
  PAGE_VARIABLES,
  BASE_URL,
  DEFAULT_PROFILE_IMAGE,
} from '../constants';

export const createPost = async body => {
  var raw = JSON.stringify(body);
  console.log(body);

  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
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
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
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
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
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
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
    redirect: 'follow',
    body: JSON.stringify(body),
  };
  return fetch(
    'https://api.cmpegroupthree.store/profile/settings',
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log('result: ', result);
      return JSON.parse(result);
    })
    .catch(error => console.log('error', error));
};

export const getUserSettings = async () => {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
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
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
    redirect: 'follow',
  };

  return fetch(
    'https://api.cmpegroupthree.store/posts?communityId=' + communityId,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      return JSON.parse(result);
    })
    .catch(error => console.log('error', error));
};
