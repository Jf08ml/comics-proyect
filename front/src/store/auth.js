import { login, refreshTokens } from '@/services/authServices';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
  }),
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    async login(username, password) {
      const response = await login(username, password);
      this.token = response.token;
      this.refreshToken = response.refreshToken;
      localStorage.setItem('accessToken', this.token);
      localStorage.setItem('refreshToken', this.refreshToken);
    },

    async refreshToken() {
      const response = await refreshTokens(this.refreshToken);
      this.token = response.token;
      this.refreshToken = response.refreshToken;
      localStorage.setItem('accessToken', this.token);
      localStorage.setItem('refreshToken', this.refreshToken);
    },
  },
});
