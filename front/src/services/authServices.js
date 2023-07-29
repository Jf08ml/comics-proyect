import { apiAuth } from "./api.js";

// const BASE_URL = 'http://localhost:3000/api/auth';
// const BASE_URL = 'http://192.168.101.13:3000/api/auth'

export async function login(identifier, password) {
  try {
    const response = await apiAuth.post(
      `/login`,
      {
        identifier,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function signup(nickname, email, password) {
  try {
    const response = await apiAuth.post(
      `/signup`,
      {
        nickname,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUser(token) {
  try {
    const response = await apiAuth.get(`/getuser`, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function searchNickname(nickname) {
  try {
    const response = await apiAuth.get(`/searchnickname/${nickname}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error service");
  }
}

export async function updateUser(userData, token) {
  try {
    const response = await apiAuth.put(`/updateuser`, userData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function updatePassword(passwords, token) {
  try {
    const response = await apiAuth.put(`/updatepassword`, passwords, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function updateProfilePhoto(userPhotoUrl, token) {
  try {
    const response = await apiAuth.put(`/updateprofilephoto`, userPhotoUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error al actualizar los datos del usuario");
  }
}
