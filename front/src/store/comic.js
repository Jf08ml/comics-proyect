import { seriePost, getUserSeries, getUserSerie, putComic, comicPost, getUserComics, getUserComic, getAzarComics } from "@/services/comicServices";
import { defineStore } from 'pinia';
import { useAuthStore } from "./auth";

const authStore = useAuthStore();

export const useComicStore = defineStore('comic', {
    actions: {
        async seriePost(serie) {
            try {
                const response = await seriePost(serie, authStore.token);
                return response;
            } catch (error) {
                return error;
            }
        },

        async getUserSeries() {
            try {
                const response = await getUserSeries(authStore.token);
                return response;
            } catch (error) {
                if (error.result == 'TokenExpiredError') {
                    try {
                        const response = await useAuthStore.refreshToken()
                        if (response.result == "success") {
                            location.reload(true)
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
                return error;
            }
        },

        async getUserSerie(id) {
            try {
                const response = await getUserSerie(id, authStore.token);
                return response;
            } catch (error) {
                if (error.result == 'TokenExpiredError') {
                    try {
                        const response = await useAuthStore.refreshToken()
                        if (response.result == "success") {
                            location.reload()
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
                return error;
            }
        },



        async putComic(comicLoaded) {
            try {
                const response = await putComic(comicLoaded, authStore.token);
                return response;
            } catch (error) {
                return error;
            }
        },

        async comicPost(postComplete) {
            try {
                const response = await comicPost(postComplete, authStore.token);
                return response;
            } catch (error) {
                return error;
            }
        },
        async getUserComics() {
            try {
                const response = await getUserComics(authStore.token);
                return response;
            } catch (error) {
                if (error.result == 'TokenExpiredError') {
                    try {
                        const response = await useAuthStore.refreshToken()
                        if (response.result == "success") {
                            location.reload()
                        }
                    } catch (error) {
                        console.error(error)
                    }
                }
                return error;
            }
        },
        async getUserComic(id) {
            if (id) {
                try {
                    const response = await getUserComic(id, authStore.token);
                    return response;
                } catch (error) {
                    if (error.result == 'TokenExpiredError') {
                        try {
                            const response = await useAuthStore.refreshToken()
                            if (response.result == "success") {
                                location.reload()
                            }
                        } catch (error) {
                            console.error(error)
                        }
                    }
                    return error;
                }
            }
        },

        async getAzarComics() {
            try {
                const response = await getAzarComics()
                return response;
            } catch (error) {
                return error;
            }
        }
    }
})
