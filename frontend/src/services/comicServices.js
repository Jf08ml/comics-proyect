import { apiComics } from "./api.js";

// const BASE_URL = "http://localhost:3000/api/comic";
// const BASE_URL = 'http://192.168.101.13:3000/api/comic'

export async function seriePost(serie, token) {
  try {
    const response = await apiComics.post(
      `/postserie`,
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
    const response = await apiComics.get(
      `/userseries?page=${page}&limit=${limit}`,
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
    const response = await apiComics.get(`/userserie/${id}`, {
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
    const response = await apiComics.put(
      `/putcomic`,
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
    const response = await apiComics.post(
      `/postcomic`,
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
    const response = await apiComics.get(`/usercomics`, {
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
    const response = await apiComics.get(`/usercomic/${id}`, {
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
    const response = await apiComics.get(`/azarcomics`, {
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
    const response = await apiComics.post(
      `/rateComic`,
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
    const response = await apiComics.put(
      `/assignScore`,
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
    const response = await apiComics.put(
      `/assignScoreSerie`,
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
    const response = await apiComics.put(
      `/sumView`,
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
    const response = await apiComics.put(
      `/sumViewSerie`,
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

export async function getAnimatedSeriesMostViews(page, limit) {
  try {
    const response = await apiComics.get(
      `/mostViewsAnimated?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getRealSeriesMostViews(page, limit) {
  try {
    const response = await apiComics.get(
      `/mostViewsReal?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getNewerSeries(type, page, limit) {
  try {
    const response = await apiComics.get(
      `/newerSeries/${type}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getPopularSeries(type, page, limit) {
  try {
    const response = await apiComics.get(
      `/popularSeries/${type}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getFeaturedArtists(type) {
  try {
    const response = await apiComics.get(`/featureArtist/${type}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getArtistSeries(artist, page, limit) {
  try {
    const response = await apiComics.get(
      `/artistSeries/${artist}?page=${page}&limit=${limit}`,
      {
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function searchSerie(nameSerie, page, limit) {
  try {
    const response = await apiComics.get(`/searchSeries/${nameSerie}?page=${page}&limit=${limit}`, {
      headers: {
        "Cache-Control": "no-cache",
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}
