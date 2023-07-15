import api from "./api.js";

const BASE_URL = 'http://localhost:3000/api/auth';
// const BASE_URL = 'http://192.168.101.13:3000/api/auth'

export async function login(identifier, password) {
  try {
    const response = await api.post(
      `${BASE_URL}/login`,
      {
        identifier, password
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
    const response = await api.post(
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

export async function getUser(token) {
  try {
    const response = await api.get(
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
    return await Promise.reject(error.response.data);
  }
}

export async function searchNickname(nickname) {
  try {
    const response = await api.get(
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
    const response = await api.put(
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
    return await Promise.reject(error.response.data);
  }
}

export async function updatePassword(passwords, token) {
  try {
    const response = await api.put(
      `${BASE_URL}/updatepassword`,
      passwords,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}


export async function updateProfilePhoto(userPhotoUrl, token) {
  try {
    const response = await api.put(
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
