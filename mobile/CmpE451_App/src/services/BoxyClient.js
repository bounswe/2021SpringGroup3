import {getToken} from './asyncStorageService';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';
import ToastAndroid from 'react-native';

export const createPost = async body => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', await getToken());
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify(body);
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
      (isMember
        ? '?isMember=' + isMember
        : isModerator
        ? '?isModerator=' + isModerator
        : ''),
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

export const createCommunity = async ({
  name,
  iconUrl,
  description,
  isPrivate,
}) => {
  return fetch(BASE_URL + 'communities', {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      iconUrl: iconUrl,
      description: description,
      isPrivate: isPrivate,
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export const updateCommunity = async ({
  communityId,
  name,
  iconUrl,
  description,
  isPrivate,
}) => {
  return fetch(BASE_URL + 'communities/update', {
    method: 'POST',
    body: JSON.stringify({
      communityId: communityId,
      name: name,
      iconUrl: iconUrl,
      description: description,
      isPrivate: isPrivate,
    }),
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export const getCommunityDetail = async ({communityId}) => {
  return fetch(BASE_URL + 'communities/detail?communityId=' + communityId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export const joinCommunity = async ({communityId}) => {
  return fetch(BASE_URL + 'communities/join?communityId=' + communityId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export const leaveCommunity = async ({communityId}) => {
  return fetch(BASE_URL + 'communities/leave?communityId=' + communityId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export const acceptJoinRequest = async ({communityId, userId}) => {
  return fetch(
    BASE_URL +
      'communities/join/approve?communityId=' +
      communityId +
      '&userId=' +
      userId,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
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

export const rejectJoinRequest = async ({communityId, userId}) => {
  return fetch(
    BASE_URL +
      'communities/join/reject?communityId=' +
      communityId +
      '&userId=' +
      userId,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
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

export const acceptJoinModeratorsRequest = async ({communityId, userId}) => {
  return fetch(
    BASE_URL +
      'communities/join/moderators/approve?communityId=' +
      communityId +
      '&userId=' +
      userId,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
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

export const rejectJoinModeratorsRequest = async ({communityId, userId}) => {
  return fetch(
    BASE_URL +
      'communities/join/moderators/reject?communityId=' +
      communityId +
      '&userId=' +
      userId,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
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

export const kickMember = async ({communityId, userId}) => {
  return fetch(
    BASE_URL +
      'communities/kick?communityId=' +
      communityId +
      '&userId=' +
      userId,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
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

export const joinModerators = async ({communityId}) => {
  return fetch(
    BASE_URL + 'communities/join/moderators?communityId=' + communityId,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Platform': 'ANDROID',
        Authorization: await getToken(),
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

export const getPostDetail = async ({communityId, postId}) => {
  var myHeaders = new Headers();
  myHeaders.append('X-Platform', 'ANDROID');
  myHeaders.append('Authorization', await getToken());

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    'https://api.cmpegroupthree.store/posts/detail?communityId=' +
      communityId +
      '&postId=' +
      postId,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      return result;
    })
    .catch(error => console.log('error', error));
};

export const getOtherProfile = async id => {
  var myHeaders = new Headers();
  myHeaders.append('Authorization', await getToken());
  myHeaders.append('X-Platform', 'ANDROID');
  console.log('IDDDDDD: ', id);
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  return fetch(
    'https://api.cmpegroupthree.store/profile/other?userId=' + id,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      console.log('userIduserId ', id);
      console.log('userProfile: ', result);
      return JSON.parse(result);
    })
    .catch(error => console.log('error', error));
};
export const deleteAccount = async () => {
  return fetch(BASE_URL + 'profile/settings', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export const getPosts = async ({communityId}) => {
  return fetch(BASE_URL + 'posts' + '?communityId=' + communityId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
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

const returnResponse = async response => {
  const statusCode = response.status;
  response = await response.json();
  return {
    status: statusCode,
    data: response,
  };
};