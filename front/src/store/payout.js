import { requestPayout } from "@/services/payoutServices";
import { defineStore } from 'pinia';
import { useAuthStore } from "./auth";

const authStore = useAuthStore();

export const usePayoutStore = defineStore('payout',{
    state: () => ({
        token: authStore.token,
        refreshTokenUser: authStore.refreshTokenUser
    }),
    actions: {
        async requestPayout(payoutData) {
            try {
                const response = await requestPayout(payoutData, this.token);
                console.log(response)
                return response;
            } catch (error) {
                console.log(error)
            }
        }
    }
})