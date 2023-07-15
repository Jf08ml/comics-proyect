
import { defineStore } from "pinia";
import Cookies from "js-cookie";
import router from "@/router";
import {
  login,
  signup,
  searchNickname,
  updateUser,
  updateProfilePhoto,
  getUser,
  updatePassword,
} from "@/services/authServices";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: Cookies.get("accessToken") || null,
    refreshTokenUser: Cookies.get("refreshToken") || null,
    userImgProfile: "",
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(identifier, password) {
      const response = await login(identifier, password);
      this.token = response.token;
      this.refreshTokenUser = response.refreshToken;
      Cookies.set("accessToken", this.token, { sameSite: "strict" });
      Cookies.set("refreshToken", this.refreshTokenUser, {
        sameSite: "strict",
      });
      return response;
    },

    async signup(nickname, email, password) {
      const response = await signup(nickname, email, password);
      this.token = response.token;
      this.refreshTokenUser = response.refreshToken;
      Cookies.set("accessToken", this.token, { sameSite: "strict" });
      Cookies.set("refreshToken", this.refreshTokenUser, {
        sameSite: "strict",
      });
    },

    // async refreshToken() {
    //   try {
    //     const response = await refreshToken(this.refreshTokenUser);
    //     this.token = response.token;
    //     this.refreshTokenUser = response.refreshToken;
    //     Cookies.set("accessToken", this.token, { sameSite: "strict" });
    //     Cookies.set("refreshToken", this.refreshTokenUser, {
    //       sameSite: "strict",
    //     });
    //     return response;
    //   } catch (error) {
    //     if (error.message == "TokenExpiredError") {
    //       this.logout();
    //     }
    //     console.error(error);
    //   }
    // },

    async getUser() {
      try {
        const response = await getUser(this.token);
        this.userImgProfile = response.user.userUrlPhoto;
        return response;
      } catch (error) {
        return error;
      }
    },

    async searchNickname(nickname) {
      const response = await searchNickname(nickname);
      return response;
    },

    async logout() {
      this.token = null;
      this.refreshToken = null;
      Cookies.remove("accessToken", { sameSite: "strict" });
      Cookies.remove("refreshToken", { sameSite: "strict" });
      router.push("/");
    },

    async updateUser(userData) {
      try {
        const response = await updateUser(userData, this.token);
        return response;
      } catch (error) {
        console.log(error);
        return error;
      }
    },

    async updatePassword(currentPassword, newPassword) {
      const requestBody = { currentPassword, newPassword };
      const response = await updatePassword(requestBody, this.token);
      return response;
    },

    async updateProfilePhoto(userPhotoUrl) {
      const response = await updateProfilePhoto(userPhotoUrl, this.token);
      if (response == "Photo update success") {
        this.userImgProfile = userPhotoUrl;
      }
      return response;
    },
  },
});
