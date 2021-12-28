import {TEXT} from '../constants';
import ToastAndroid from 'react-native';

export const getCommunityDetail = async ({query}) => {
  return fetch(
    'https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=en&search=' +
      query,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

const returnResponse = async response => {
  const statusCode = response.status;
  response = await response.json();
  return {
    status: statusCode,
    data: response,
  };
};
