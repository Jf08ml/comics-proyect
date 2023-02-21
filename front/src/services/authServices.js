import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api';

export async function login(username, password) {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/login',
      {
        username, password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function refreshToken(refreshToken) {
  try {
    const response = await axios.post('http://localhost:3000/api/refresh-token', { refreshToken });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Token refresh failed');
  }
}