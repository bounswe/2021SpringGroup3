import axios from 'axios';
import {
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
  CREATE_COMMUNITY_ENDPOINT,
  GET_COMMUNITIES_ENDPOINT
} from './urls';

export async function login(info) {
  const header = {headers: {
    'X-Platform': 'WEB',
    'accept': '*/*',
  }}
  const body= { username: info.username, password: info.password }
  try {
    const response = await axios.post(
      LOGIN_ENDPOINT,
      { ...body },
      {...header}
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
    const header = {headers: {
      'X-Platform': 'WEB',
      'accept': '*/*',
    }}
    const body= { username: info.username, email:info.email, password: info.password }
    const response = await axios.post(
      REGISTER_ENDPOINT,
      { ...body },
      {...header}
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
    const header = {headers: {
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

export async function createCommunity(info) {
  try {
    const header = {headers: {
      'X-Platform': 'WEB',
      'accept': '*/*',
      'authorization': `${info.token}`
      },
    }
    console.log(header);
    const body= { name: info.name }
    const response = await axios.post(CREATE_COMMUNITY_ENDPOINT, { ...body }, { ...header });
    return response;
  } catch (error) {
    console.log(error);
    
    return error
  }
}

export async function getCommunities(info) {
  try {
    const header = {headers: {
      'X-Platform': 'WEB',
      'accept': '*/*',
      'authorization': `${info.token}`
      },
    }
    console.log(header);
    const body= { isMember: true }
    const response = await axios.get(GET_COMMUNITIES_ENDPOINT, { ...body }, { ...header });
    return response;
  } catch (error) {
    console.log(error);
    
    return error
  }
}
