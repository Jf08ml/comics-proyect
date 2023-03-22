import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

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