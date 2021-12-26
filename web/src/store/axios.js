import axios from 'axios';
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
  CREATE_COMMUNITY_ENDPOINT,
  GET_COMMUNITIES_ENDPOINT,
  GET_COMMUNITY_PAGE_ENDPOINT,
  LEAVE_COMMUNITY_ENDPOINT,
  JOIN_COMMUNITY_ENDPOINT,
  APPROVE_COMMUNITY_ENDPOINT,
  REJECT_COMMUNITY_ENDPOINT,
  JOIN_COMMUNITY_MODERATOR_ENDPOINT,
  APPROVE_COMMUNITY_MODERATOR_ENDPOINT,
  REJECT_COMMUNITY_MODERATOR_ENDPOINT,
  KICK_COMMUNITY_ENDPOINT,
  DELETE_COMMUNITY_ENDPOINT,
  CREATE_POST_ENDPOINT,
  GET_POSTS_ENDPOINT,
  GET_POSTTYPES_ENDPOINT,
  GET_POSTTYPE_DETAIL_ENDPOINT,
  GET_POST_PAGE_ENDPOINT,
  CREATE_POSTTYPE_ENDPOINT,
  GET_PROFILE_ENDPOINT,
  GET_PROFILE_SETTINGS_ENDPOINT,
  POST_PROFILE_SETTINGS_ENDPOINT,
  GET_PROFILE_OTHER_ENDPOINT
} from './urls';

export async function login(info) {
  const header = {
    headers: {
      'X-Platform': 'WEB',
      'accept': '*/*',
    }
  }
  const body = { username: info.username, password: info.password }
  try {
    const response = await axios.post(
      LOGIN_ENDPOINT,
      { ...body },
      { ...header }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}

export async function register(info) {
  try {
    const header = {
      headers: {
        'X-Platform': 'WEB',
        'accept': '*/*',
      }
    }
    const body = { username: info.username, email: info.email, password: info.password }
    const response = await axios.post(
      REGISTER_ENDPOINT,
      { ...body },
      { ...header }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}

export async function logout(info) {
  try {
    const header = {
      headers: {
        'X-Platform': 'WEB',
        'accept': '*/*',
        'authorization': `${info}`
      }
    }
    const response = await axios.delete(LOGOUT_ENDPOINT, { ...header });
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}

export async function createCommunity(info, token) {
  try {
    const header = {
      headers: {
        'X-Platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    console.log(info)
    const response = await axios.post(CREATE_COMMUNITY_ENDPOINT, { ...info }, { ...header });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function createPostType(info, token) {
  try {
    const header = {
      headers: {
        'X-Platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    console.log(header);
    const body = { ...info }
    const response = await axios.post(CREATE_POSTTYPE_ENDPOINT, { ...body }, { ...header });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export async function getPostTypes(info) {
  try {
    const header = {
      headers: {
        'X-Platform': 'WEB',
        'accept': '*/*',
        'authorization': `${info.token}`
      },
    }
    console.log(header);
    const response = await axios.get(GET_POSTTYPES_ENDPOINT + "?communityId=" + info.communityId, { ...header });
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}


export async function getPostTypeDetail(info, token) {
  try {
    const header = {
      headers: {
        'X-Platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    console.log(header);
    const response = await axios.get(GET_POSTTYPE_DETAIL_ENDPOINT + "?communityId=" + info.communityId + "&postTypeId=" + info.postTypeId, { ...header });
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}

export async function getCommunities(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    console.log(token)
    const response = await axios.get(GET_COMMUNITIES_ENDPOINT + "?isMember=" + info.isMember, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}

export async function getCommunityPage(info) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${info.token}`
      },
    }
    const response = await axios.get(GET_COMMUNITY_PAGE_ENDPOINT + "?communityId=" + info.id, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function leaveCommunity(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.post(LEAVE_COMMUNITY_ENDPOINT + "?communityId=" + info.communityId, { ...info }, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function joinCommunity(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.post(JOIN_COMMUNITY_ENDPOINT + "?communityId=" + info.communityId, { ...info }, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function joinCommunityModerator(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.post(JOIN_COMMUNITY_MODERATOR_ENDPOINT + "?communityId=" + info.communityId, { ...info }, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function acceptUser(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.post(APPROVE_COMMUNITY_ENDPOINT + "?communityId=" + info.communityId + "&userId=" + info.userId, { ...info }, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function rejectUser(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.post(REJECT_COMMUNITY_ENDPOINT + "?communityId=" + info.communityId + "&userId=" + info.userId, { ...info }, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function acceptModerator(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.post(APPROVE_COMMUNITY_MODERATOR_ENDPOINT + "?communityId=" + info.communityId + "&userId=" + info.userId, { ...info }, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function rejectModerator(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.post(REJECT_COMMUNITY_MODERATOR_ENDPOINT + "?communityId=" + info.communityId + "&userId=" + info.userId, { ...info }, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function kickUser(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.post(KICK_COMMUNITY_ENDPOINT + "?communityId=" + info.communityId + "&userId=" + info.userId, { ...info }, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function deleteCommunity(info, token) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const response = await axios.delete(DELETE_COMMUNITY_ENDPOINT + "?communityId=" + info.communityId, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function createPost(info, token) {
  try {
    const header = {
      headers: {
        'X-Platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    const body = { ...info }
    const response = await axios.post(CREATE_POST_ENDPOINT, { ...body }, { ...header });

    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}



export async function getProfile(info) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${info.token}`
      },
    }

    const response = await axios.get(GET_PROFILE_ENDPOINT, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function getProfileOther(info) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${info.token}`
      },
    }

    const response = await axios.get(GET_PROFILE_OTHER_ENDPOINT + "?userId=" + info.id, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}


export async function getCommunityPosts(info) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${info.token}`
      },
    }
    const response = await axios.get(GET_POSTS_ENDPOINT + "?communityId=" + info.id, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}

export async function getPostPage(info) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${info.token}`
      },
    }
    const response = await axios.get(GET_POST_PAGE_ENDPOINT + "?communityId=" + info.communityId + "&postId=" + info.postId, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}

export async function getProfileSettings(info) {
  try {
    const header = {
      headers: {
        'x-platform': 'WEB',
        'accept': '*/*',
        'authorization': `${info.token}`
      },
    }
    const response = await axios.get(GET_PROFILE_SETTINGS_ENDPOINT, { ...header });
    console.log(response)
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}

export async function postProfileSettings(info, token) {
  try {
    const header = {
      headers: {
        'X-Platform': 'WEB',
        'accept': '*/*',
        'authorization': `${token}`
      },
    }
    console.log(info)
    const response = await axios.post(POST_PROFILE_SETTINGS_ENDPOINT, { ...info }, { ...header });
    return response;
  } catch (error) {
    console.log(error);

    return error
  }
}
