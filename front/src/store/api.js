// Importa axios y otras dependencias necesarias
import axios from "axios";
import { useAuthStore } from "@/store/auth";

// Crea una instancia de axios
const api = axios.create({
  baseURL: "http://localhost:3000/api/comic",
  // ...
});

// Obtiene la instancia de la tienda de autenticación
const authStore = useAuthStore();

// Configura el interceptor para los errores de respuesta
api.interceptors.response.use(
  // Intercepta respuestas exitosas y las devuelve sin cambios
  (response) => response,

  // Intercepta errores de respuesta
  async (error) => {
    // Verifica si el error es por token expirado
    if (error.response.status === 401 && error.response.data.error === "TokenExpiredError") {
      try {
        // Intenta refrescar el token
        await authStore.refreshToken();

        // Repite la solicitud original con el nuevo token
        const originalRequest = error.config;
        originalRequest.headers.Authorization = authStore.token;
        return api(originalRequest);
      } catch (refreshError) {
        // Error al refrescar el token, ejecuta el logout
        authStore.logout();
        throw refreshError;
      }
    }

    // Otros errores de respuesta
    throw error;
  }
);

export default api;
