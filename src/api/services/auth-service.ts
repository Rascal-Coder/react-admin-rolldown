import { baseRequestClient } from "@/api/request";
import userStore from "@/store/user-store";
import type { UserInfo } from "@/types/user";
import { requestClient } from "../request";

export interface CaptchaResult {
  id: string;
  imageBase64: string;
}

export interface PublicKeyResult {
  publicKey: string;
}
const getPublicKey = () =>
  requestClient.get<PublicKeyResult>("/auth/publicKey");

const getCaptcha = () => requestClient.get<CaptchaResult>("/auth/captcha");

const logout = () => requestClient.post<void>("/auth/logout");

function refreshTokenApi() {
  const refreshToken = userStore.getState().userToken.refreshToken;
  console.log("refreshToken", refreshToken);

  return baseRequestClient.post<{
    data: {
      expire: number;
      accessToken: string;
      refreshExpire: number;
      refreshToken: string;
    };
  }>(
    "/auth/refresh/token",
    { refreshToken },
    {
      withCredentials: true,
    }
  );
}

/** 获取当前登录用户信息 */
const getCurrentUser = () => requestClient.get<UserInfo>("/auth/current/user");

export default {
  getPublicKey,
  getCaptcha,
  logout,
  refreshTokenApi,
  getCurrentUser,
};
