import { login, refreshTokens, signup } from '@/services/authServices';
import { defineStore } from 'pinia';
import Cookies from 'js-cookie';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: Cookies.get('accessToken') || null,
    refreshToken: Cookies.get('refreshToken') || null,
  }),
  getters: {
    isAuthenticated: state => !!state.token,
  },
  actions: {
    async login(email, password) {
      const response = await login(email, password);
      this.token = response.token;
      this.refreshToken = response.refreshToken;
      Cookies.set('accessToken', this.token, { httpOnly: true, secure: true, sameSite: 'strict' });
      Cookies.set('refreshToken', this.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    },

    async signup(email, password) {
      const response = await signup(email, password);
      this.token = response.token;
      this.refreshToken = response.refreshToken;
      Cookies.set('accessToken', this.token, { httpOnly: true, secure: true, sameSite: 'strict' });
      Cookies.set('refreshToken', this.refreshToken, { httpOnly: true, secure: true, sameSite: 'strict' });
    },

    async refreshToken() {
      const response = await refreshTokens(this.refreshToken);
      this.token = response.token;
      this.refreshToken = response.refreshToken;
    },

    async logout() {
      this.token = null;
      this.refreshToken = null;
      Cookies.remove('accessToken', { httpOnly: true, secure: true, sameSite: 'strict' });
      Cookies.remove('refreshToken', { httpOnly: true, secure: true, sameSite: 'strict' });
      console.log("Cookies eliminadas:", Cookies.get());
    },
  },
});
