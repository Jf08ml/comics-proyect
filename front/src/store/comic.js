import {
  seriePost,
  getUserSeries,
  getUserSerie,
  putComic,
  comicPost,
  getUserComics,
  getUserComic,
  getAzarComics,
  postRateComic,
  assignScore,
  assignScoreSerie,
  countViews,
  countViewsSerie,
  getAnimatedSeriesMostViews,
  getRealSeriesMostViews,
} from "@/services/comicServices";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

const authStore = useAuthStore();

export const useComicStore = defineStore("comic", {
  actions: {
    async seriePost(serie) {
      try {
        const response = await seriePost(serie, authStore.token);
        return response;
      } catch (error) {
        seriePost(serie);
        return error;
      }
    },

    async getUserSeries(page, limit) {
      try {
        const response = await getUserSeries(page, limit, authStore.token);
        return response;
      } catch (error) {
        if (error.result == "TokenExpiredError") {
          try {
            const response = await useAuthStore.refreshToken();
            if (response.result == "success") {
              getUserSeries(page, limit);
            }
          } catch (error) {
            console.error(error);
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
        if (error.result == "TokenExpiredError") {
          try {
            const response = await useAuthStore.refreshToken();
            if (response.result == "success") {
              getUserSerie(id);
            }
          } catch (error) {
            console.error(error);
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
        return error;
      }
    },
    async getUserComic(id) {
      if (id) {
        try {
          const response = await getUserComic(id, authStore.token);
          return response;
        } catch (error) {
          return error;
        }
      }
    },

    async getAzarComics() {
      try {
        const response = await getAzarComics();
        return response;
      } catch (error) {
        return error;
      }
    },

    async postRateComic(rate, comicId) {
      try {
        const response = await postRateComic(comicId, rate, authStore.token);
        return response;
      } catch (error) {
        return error;
      }
    },

    async assignScore(comicId) {
      try {
        const response = await assignScore(comicId, authStore.token);
        return response;
      } catch (error) {
        return error;
      }
    },

    async assignScoreSerie(serieId) {
      try {
        const response = await assignScoreSerie(serieId, authStore.token);
        return response;
      } catch (error) {
        return error;
      }
    },

    async countViews(comicId) {
      try {
        const response = await countViews(comicId, authStore.token);
        return response;
      } catch (error) {
        return error;
      }
    },

    async countViewsSerie(serieId) {
      try {
        const response = await countViewsSerie(serieId, authStore.token);
        return response;
      } catch (error) {
        return error;
      }
    },

    async getAnimatedSeriesMostViews() {
      try {
        const response = await getAnimatedSeriesMostViews();
        return response;
      } catch (error) {
        return error;
      }
    },

    async getRealSeriesMostViews() {
      try {
        const response = await getRealSeriesMostViews();
        return response;
      } catch (error) {
        return error;
      }
    },
  },
});
