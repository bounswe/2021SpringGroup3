var myHeaders = new Headers();
import {getToken} from '../services/asyncStorageService';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';

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
