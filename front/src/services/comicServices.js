import axios from "axios";

const BASE_URL = "http://localhost:3000/api/comic";
// const BASE_URL = 'http://192.168.101.13:3000/api/comic'

export async function seriePost(serie, token) {
  try {
    const response = await axios.post(
      `${BASE_URL}/postserie`,
      {
        serie,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUserSeries(page, limit, token) {
  try {
    const response = await axios.get(
      `${BASE_URL}/userseries?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUserSerie(id, token) {
  try {
    const response = await axios.get(`${BASE_URL}/userserie/${id}`, {
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

export async function putComic(comicLoaded, token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/putcomic`,
      {
        comicLoaded,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function comicPost(postComplete, token) {
  try {
    const response = await axios.post(
      `${BASE_URL}/postcomic`,
      {
        postComplete,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUserComics(token) {
  try {
    const response = await axios.get(`${BASE_URL}/usercomics`, {
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

export async function getUserComic(id, token) {
  try {
    const response = await axios.get(`${BASE_URL}/usercomic/${id}`, {
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

export async function getAzarComics() {
  try {
    const response = await axios.get(`${BASE_URL}/azarcomics`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function postRateComic(comicId, rate, token) {
  try {
    const response = await axios.post(
      `${BASE_URL}/rateComic`,
      {
        rate,
        comicId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function assignScore(comicId, token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/assignScore`,
      {
        comicId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function assignScoreSerie(serieId, token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/assignScoreSerie`,
      {
        serieId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function countViews(comicId, token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/sumView`,
      {
        comicId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function countViewsSerie(serieId, token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/sumViewSerie`,
      {
        serieId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getAnimatedSeriesMostViews() {
  try {
    const response = await axios.get(`${BASE_URL}/mostViewsAnimated`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getRealSeriesMostViews() {
  try {
    const response = await axios.get(`${BASE_URL}/mostViewsReal`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getNewerSeries(type) {
  try {
    const response = await axios.get(`${BASE_URL}/newerSeries/${type}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}
