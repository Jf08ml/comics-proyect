import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api';
// const BASE_URL_LOCAL = 'http://192.168.101.13:3000/api/'

export async function login(email, password) {
  try {
    const response = await axios.post(
      'http://192.168.101.13:3000/api/login',
      {
        email, password
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

export async function signup(email, password) {
  try {
    const response = await axios.post(
      'http://192.168.101.13:3000/api/signup',
      {
        email, password
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
    const response = await axios.post('http://192.168.101.13:3000/api/refresh-token', { refreshToken });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Token refresh failed');
  }
}