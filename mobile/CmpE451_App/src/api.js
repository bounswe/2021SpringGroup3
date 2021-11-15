export const BASE_URL = 'https://api.cmpegroupthree.store/';

const headers = {
  'Content-Type': 'application/json',
  'X-Platform': 'ANDROID',
};

const returnResponse = async response => {
  const statusCode = response.status;
  response = await response.json();
  return {
    statusCode,
    data: response,
  };
};

export const login = async ({username, password}) => {
  let response = await fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers,
    body: {
      username,
      password,
    },
  });
  return returnResponse(response);
};

export const register = async ({username, password, email}) => {
  let response = await fetch(`${BASE_URL}auth/register`, {
    method: 'POST',
    headers,
    body: {
      username,
      password,
      email,
    },
  });
  return returnResponse(response);
};
