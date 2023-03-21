import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export async function requestPayout(payoutData, token) {
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