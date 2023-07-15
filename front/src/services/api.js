import axios from "axios";
import { refreshToken } from "./refreshToken";
import EventBus from '../utils/eventBus';

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
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
        EventBus.emit('logout')
        throw new Error("refreshTokenExpired");
      }
    }
    throw error;
  }
);

export default api;
