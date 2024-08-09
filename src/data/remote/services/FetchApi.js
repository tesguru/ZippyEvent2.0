// api.js
//due to serializable error we are ecountering on all this api when we use create thunk and axios we had to use fetch api as alternative
const API_KEY = '20230098';
const BASE_HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': API_KEY,
};

const apiFetch = async ({ url, method = 'GET', body = null, timeout = 60000 }) => {
  try {
    const response = await fetch(url, {
      method,
      headers: BASE_HEADERS,
      body: body ? JSON.stringify(body) : null,
      timeout,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

export const createUserAccount = async (data) => {
  return apiFetch({
    url: 'https://eventapi.zippyworld.app/zippy_event/user_account_creation',
    method: 'POST',
    body: data,
  });
};

export const UpdateAccountFetchApi = async (data) => {
    return apiFetch({
      url: 'https://eventapi.zippyworld.app/zippy_event/update_account',
      method: 'POST',
      body: data,
    });
  };

  export const upload = async (data) => {
    return apiFetch({
      url: 'https://eventapi.zippyworld.app/zippy_event/update_account',
      method: 'POST',
      body: data,
    });
  };




