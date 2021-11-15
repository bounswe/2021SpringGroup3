export const BASE_URL = 'https://api.cmpegroupthree.store/';

const headers = {
  'Content-Type': 'application/json',
  'X-Platform': 'ANDROID',
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
  const statusCode = response.status;
  response = await response.json();
  return {
    statusCode,
    data: response,
  };
};
