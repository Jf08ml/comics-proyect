import { emailPayout, getUserPayments, requestPayment, getAllPaymentsUser } from "@/services/payoutServices";
import { defineStore } from 'pinia';
import { useAuthStore } from "./auth";

const authStore = useAuthStore();

export const usePayoutStore = defineStore('payout', {
    actions: {
        async emailPayout(payoutData) {
            try {
                const response = await emailPayout(payoutData, authStore.token);
                return response;
            } catch (error) {
                return error;
            }
        },

        async getUserPayments() {
            try {
                const response = await getUserPayments(authStore.token);
                return response;
            } catch (error) {
                return error;
            }
        },

        async requestPayment(dataRequestPayment) {
            try {
                const response = await requestPayment(dataRequestPayment, authStore.token);
                return response;
            } catch (error) {
                return error;
            }
        },

        async getAllPaymentsUser() {
            try {
                const response = await getAllPaymentsUser(authStore.token)
                return response;
            } catch (error) {
                return error;
            }
        }
    }
})