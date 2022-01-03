import {getToken} from './asyncStorageService';
import {TEXT, PAGE_VARIABLES, BASE_URL} from '../constants';
import ToastAndroid from 'react-native';

export const createPost = async body => {
  var raw = JSON.stringify(body);
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
    'https://api.cmpegroupthree.store/profile/other?userId=' + id,
    requestOptions,
  )
    .then(response => response.text())
    .then(result => {
      //console.log('userIduserId ', id);
      //console.log('userProfile: ', result);
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

export const deleteCommunity = async ({communityId}) => {
  return fetch(BASE_URL + 'communities?communityId=' + communityId, {
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

export const likePost = async ({communityId, postId}) => {
  return fetch(
    BASE_URL +
      'posts/like' +
      '?communityId=' +
      communityId +
      '&postId=' +
      postId,
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

export const unlikePost = async ({communityId, postId}) => {
  return fetch(
    BASE_URL +
      'posts/unlike' +
      '?communityId=' +
      communityId +
      '&postId=' +
      postId,
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

export const commentPost = async ({postId, comment}) => {
  return fetch(BASE_URL + 'posts/comment' + '?postId=' + postId, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
    body: JSON.stringify({
      text: comment,
    }),
  })
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export function getSearchCommunityUrl(query) {
  return BASE_URL + 'communities/search' + '?query=' + query;
}

export const searchCommunity = async ({query}) => {
  return fetch(getSearchCommunityUrl(query), {
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

export function getSearchUserUrl(query) {
  return BASE_URL + 'profile/search' + '?query=' + query;
}

export const searchUser = async ({query}) => {
  return fetch(getSearchUserUrl(query), {
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

export function getRecommendedCommunitiesUrl() {
  return BASE_URL + 'communities/recommend';
}

export const getRecommendedCommunities = async () => {
  return fetch(getRecommendedCommunitiesUrl(), {
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

export function getRecommendedUsersUrl() {
  return BASE_URL + 'profile/recommend';
}

export const getRecommendedUsers = async () => {
  return fetch(getRecommendedUsersUrl(), {
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

export function getPostTypesUrl(communityId) {
  return BASE_URL + 'post-types?communityId=' + communityId;
}

export const getPostTypes = async ({communityId}) => {
  return fetch(getPostTypesUrl(communityId), {
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

export function getAdvancedSearchPostsUrl(sortBy) {
  return BASE_URL + 'posts/advancedSearch?sortBy=' + sortBy;
}

export const advancedSearchPosts = async ({body, sortBy}) => {
  var raw = JSON.stringify(body);
  return fetch(getAdvancedSearchPostsUrl(sortBy), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
    body: raw,
  })
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export function getSearchPostsUrl(communityId, tag, sortBy) {
  return (
    BASE_URL +
    'posts/search' +
    '?communityId=' +
    communityId +
    '&sortBy=' +
    sortBy +
    '&tag=' +
    tag
  );
}

export const searchPost = async ({communityId, tag = '', sortBy}) => {
  return fetch(getSearchPostsUrl(communityId, tag, sortBy), {
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

export function getChangePasswordUrl() {
  return BASE_URL + 'auth/changePassword';
}

export const changePassword = async ({body}) => {
  var raw = JSON.stringify(body);
  return fetch(BASE_URL + 'auth/changePassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
    body: raw,
  })
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

export const getSuggesstedTags = async tag => {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
    redirect: 'follow',
  };

  return fetch(BASE_URL + 'wikidata?query=' + tag, requestOptions)
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => console.log('error', error));
};

export const getNotifications = async () => {
  var requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
    redirect: 'follow',
  };

  return fetch(BASE_URL + 'profile/notification', requestOptions)
    .then(response => {
      return returnResponse(response);
    })
    .catch(error => console.log('error', error));
};

export const followUser = async ({userId}) => {
  return fetch(BASE_URL + 'profile/follow?userId=' + userId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-Platform': 'ANDROID',
      Authorization: await getToken(),
    },
  })
    .then(result => {
      return returnResponse(result);
    })
    .catch(error => {
      console.info(error);
      ToastAndroid.show(TEXT.networkError, ToastAndroid.SHORT);
    });
};

export const unfollowUser = async ({userId}) => {
  return fetch(BASE_URL + 'profile/unfollow?userId=' + userId, {
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

export const acceptFollowRequest = async ({userId}) => {
  return fetch(
    BASE_URL +
      'profile/approve?userId=' +
      userId,
    {
      method: 'GET',
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

export const rejectFollowRequest = async ({userId}) => {
  return fetch(
    BASE_URL +
      'profile/reject?userId=' +
      userId,
    {
      method: 'GET',
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

export const getPostsHome = async ({}) => {
  return fetch(BASE_URL + 'posts/homepage' , {
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

export const deletePost = async ({postId}) => {
  return fetch(BASE_URL + 'posts?postId=' + postId, {
    method: 'DELETE',
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
