var myHeaders = new Headers();
import {getToken} from '../services/asyncStorageService';

export const createPost = async ({
  communityId,
  postTypeId,
  textFieldNames,
  numberFieldNames,
  dateFieldNames,
  linkFieldNames,
  locationFieldNames,
}) => {
  if (!name || !numberOfParticipants || !date || !link || !location) {
    throw new Error('Lütfen tüm alanları eksiksiz doldurunuz.');
  }

  var myHeaders = new Headers();
  myHeaders.append('Authorization', await getToken());
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('communityId', communityId);

  var raw = JSON.stringify({
    postTypeId: postTypeId,
    communityId: communityId,
    textFieldNames: [name],
    numberFieldNames: [numberOfParticipants],
    dateFieldNames: [date],
    linkFieldNames: [link],
    locationFieldNames: [location],
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };
  return fetch('https://api.cmpegroupthree.store/posts', requestOptions)
    .then(response => response.json())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));
};

export const getPostTypesDetail = async ({communityId, postTypeId}) => {
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
