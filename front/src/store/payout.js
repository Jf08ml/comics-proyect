import { emailPayout, getUserPayments, requestPayment, getAllPaymentsUser } from "@/services/payoutServices";
import { defineStore } from 'pinia';
import { useAuthStore } from "./auth";

const authStore = useAuthStore();

export const usePayoutStore = defineStore('payout', {
    state: () => ({
        token: authStore.token,
        refreshTokenUser: authStore.refreshTokenUser
    }),
    actions: {
        async emailPayout(payoutData) {
            try {
                const response = await emailPayout(payoutData, this.token);
                return response;
            } catch (error) {
                return error;
            }
        },

        async getUserPayments() {
            try {
                const response = await getUserPayments(this.token);
                return response;
            } catch (error) {
                return error;
            }
        },

        async requestPayment(dataRequestPayment) {
            try {
                const response = await requestPayment(dataRequestPayment, this.token);
                return response;
            } catch (error) {
                return error;
            }
        },

        async getAllPaymentsUser() {
            try {
                const response = await getAllPaymentsUser(this.token)
                return response;
            } catch (error) {
                return error;
            }
        }
    }
})