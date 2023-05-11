import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api/comic';
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

export async function getUserSeries(token) {
    try {
        const response = await axios.get(
            `${BASE_URL}/userseries`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Authorization': `${token}`,
                }
            }
        )
        return response.data;
    } catch (error) {
        return await Promise.reject(error.response.data);
    }
}

export async function getUserSerie(id, token) {
    try {
        const response = await axios.get(
            `${BASE_URL}/userserie/${id}`,
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

export async function putComic(comicLoaded, token) {
    try {
        const response = await axios.put(
            `${BASE_URL}/putcomic`,
            {
                comicLoaded,
            },
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

export async function comicPost(postComplete, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/postcomic`,
            {
                postComplete,
            },
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

export async function getUserComics(token) {
    try {
        const response = await axios.get(
            `${BASE_URL}/usercomics`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    'Authorization': `${token}`,
                }
            }
        )
        return response.data;
    } catch (error) {
        return await Promise.reject(error.response.data);
    }
}

export async function getUserComic(id, token) {
    try {
        const response = await axios.get(
            `${BASE_URL}/usercomic/${id}`,
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

export async function getAzarComics() {
    try {
        const response = await axios.get(
            `${BASE_URL}/azarcomics`,
            {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            }
        )
        return response.data;
    } catch (error) {
        return await Promise.reject(error.response.data);
    }
}