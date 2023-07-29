import { apiPayout } from "./api.js";

// const BASE_URL = 'http://localhost:3000/api/payout';
// const BASE_URL = 'http://192.168.101.13:3000/api/payout'

export async function emailPayout(payoutData, token) {
  try {
    const response = await apiPayout.post(
      `/payout`,
      {
        payoutData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getUserPayments(token) {
  try {
    const response = await apiPayout.get(`/userpayments`, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function requestPayment(dataRequestPayment, token) {
  try {
    const response = await apiPayout.put(
      `/requestpayment`,
      {
        dataRequestPayment,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}

export async function getAllPaymentsUser(token) {
  try {
    const response = await apiPayout.get(`/getallpaymentsuser`, {
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}
