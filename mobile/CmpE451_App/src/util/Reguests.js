import {AXIOS_CLIENT} from '../services/axiosCientService';
var myHeaders = new Headers();

export const createPost = async ({
  communityName,
  communityId,
  name,
  numberOfParticipants,
  date,
  link,
  location,
}) => {
  if (!name || !numberOfParticipants || !date || !link || !location) {
    throw new Error('Lütfen tüm alanları eksiksiz doldurunuz.');
  }

  var myHeaders = new Headers();
  myHeaders.append(
    'Authorization',
    '163700225561332940a2bb5803392aa169654d19358261c10923b',
  );
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    name: communityName,
    communityId: '6191913bba7421012fa6ad4e',
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
  return fetch('https://api.cmpegroupthree.store/post-types', requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log('response: ', result);
      return result;
    })
    .catch(error => console.log('error', error));
};
