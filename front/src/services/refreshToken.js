import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "http://localhost:3000/api/auth";

export async function refreshToken() {
  const refreshTokenUser = Cookies.get("refreshToken");
  try {
    const response = await axios.post(`${BASE_URL}/refreshtokens`, {
      refreshTokenUser,
    });
    Cookies.set("accessToken", response.data.token, { sameSite: "strict" });
    Cookies.set("refreshToken", response.data.refreshToken, {
      sameSite: "strict",
    });
    return response.data;
  } catch (error) {
    return await Promise.reject(error.response.data);
  }
}
