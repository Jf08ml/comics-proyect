import axios from "axios";
import { refreshToken } from "./refreshToken";
import EventBus from "../utils/eventBus";

const createAxiosInstance = (baseURL) => {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (
        error.response.status === 401 &&
        error.response.data.result === "TokenExpiredError"
      ) {
        try {
          const response = await refreshToken();
          const originalRequest = error.config;
          originalRequest.headers.Authorization = response.token;
          return api(originalRequest);
        } catch (refreshError) {
          EventBus.emit("logout");
          throw new Error("refreshTokenExpired");
        }
      }
      throw error;
    }
  );

  return api;
};

// const apiAuth = createAxiosInstance("http://192.168.101.10:3000/api/auth");
// const apiComics = createAxiosInstance("http://192.168.101.10:3000/api/comic");
// const apiPayout = createAxiosInstance("http://192.168.101.10:3000/api/payout");
// const apiAuth = createAxiosInstance("https://comic-backend-one.vercel.app/api/auth");
// const apiComics = createAxiosInstance("https://comic-backend-one.vercel.app/api/comic");
// const apiPayout = createAxiosInstance("https://comic-backend-one.vercel.app/api/payout");
const apiAuth = createAxiosInstance("http://localhost:3000/api/auth");
const apiComics = createAxiosInstance("http://localhost:3000/api/comic");
const apiPayout = createAxiosInstance("http://localhost:3000/api/payout");


export { apiAuth, apiComics, apiPayout };
