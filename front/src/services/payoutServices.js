import axios from 'axios';

// const BASE_URL = 'http://localhost:3000/api';
const BASE_URL = 'http://192.168.101.13:3000/api'

export async function emailPayout(payoutData, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/payout`,
            {
                payoutData,
            },
            {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        return await Promise.reject(error.response.data);
    }
}

export async function getUserPayments(token){
    try {
        const response = await axios.get(
            `${BASE_URL}/userpayments`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                  'Authorization': `${token}`,
                }
            }
        )
        return response.data;
    } catch (error) {
        return await Promise.reject(error.response.data);
    }
}

export async function requestPayment(dataRequestPayment, token){
    try {
        const response = await axios.put(
            `${BASE_URL}/requestpayment`,
            {
                dataRequestPayment
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                  'Authorization': `${token}`,
                }
            }
        )
        return response.data;
    } catch (error) {
        return await Promise.reject(error.response.data);
    }
}

export async function getAllPaymentsUser(token){
    try {
        const response = await axios.get(
            `${BASE_URL}/getallpaymentsuser`,
            {
                headers: {
                    'Cache-Control': 'no-cache',
                  'Authorization': `${token}`,
                }
            }
        )
        return response.data;
    } catch (error) {
        return await Promise.reject(error.response.data);
    }
}
