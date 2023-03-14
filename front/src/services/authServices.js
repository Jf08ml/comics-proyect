import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';
// const BASE_URL = 'http://192.168.101.13:3000/api'

export async function login(email, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/login`,
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

export async function signup(nickname, email, password) {
  try {
    const response = await axios.post(
      `${BASE_URL}/signup`,
      {
        nickname, email, password
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
    const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Token refresh failed');
  }
}

export async function getUser(token) {
  try {
    const response = await axios.get(
      `${BASE_URL}/getuser`,
      {
        headers: {
          'Cache-Control': 'no-cache',
          'Authorization': `${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function searchNickname(nickname) {
  try {
    const response = await axios.get(
      `${BASE_URL}/searchnickname/${nickname}`,
      {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Error service');
  }
}

export async function updateUser(userData, token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateuser`, userData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar los datos del usuario');
  }
}

export async function updateProfilePhoto(userPhotoUrl, token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/updateprofilephoto`, userPhotoUrl,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Error al actualizar los datos del usuario');
  }
}
