import { login, refreshToken, signup, searchNickname, updateUser, updateProfilePhoto, getUser } from '@/services/authServices';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
    userImgProfile: ''
  }),
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    async login(identifier, password) {
      const response = await login(identifier, password);
      this.token = response.token;
      this.refreshToken = response.refreshToken;
      Cookies.set('accessToken', this.token, { sameSite: 'strict' });
      Cookies.set('refreshToken', this.refreshToken, { sameSite: 'strict' });
    },

    async signup(nickname, email, password) {
      const response = await signup(nickname, email, password);
      this.token = response.token;
      this.refreshToken = response.refreshToken;
      Cookies.set('accessToken', this.token, { sameSite: 'strict' });
      Cookies.set('refreshToken', this.refreshToken, { sameSite: 'strict' });
    },

    async refreshToken() {
      const response = await refreshToken(this.refreshToken);
      this.token = response.token;
      this.refreshToken = response.refreshToken;
      Cookies.set('accessToken', this.token, { sameSite: 'strict' });
      Cookies.set('refreshToken', this.refreshToken, { sameSite: 'strict' });
    },

    async getUser(){
      const response = await getUser(this.token);
      this.userImgProfile = response.user.userUrlPhoto;
      return response;
    },

    async searchNickname(nickname) {
      const response = await searchNickname(nickname);
      return response;
    },

    async logout() {
      this.token = null;
      this.refreshToken = null;
      Cookies.remove('accessToken', { sameSite: 'strict' });
      Cookies.remove('refreshToken', { sameSite: 'strict' });
    },


    async updateUser(userData) {
      const response = await updateUser(userData, this.token);
      return response;
    },

    async updateProfilePhoto(userPhotoUrl) {
      const response = await updateProfilePhoto(userPhotoUrl, this.token)
      if(response == 'Photo update success'){
        this.userImgProfile = userPhotoUrl;
      }
      return response;
    }
  },
});

