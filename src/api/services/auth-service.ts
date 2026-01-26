import { baseRequestClient } from "@/api/request";
import type { UserInfo } from "@/types/user";
import { requestClient } from "../request";

export interface CaptchaResult {
  id: string;
  imageBase64: string;
}

const getPublicKey = () => requestClient.get<string>("/auth/publicKey");

const getCaptcha = () => requestClient.get<CaptchaResult>("/auth/captcha");

const logout = () => requestClient.post<void>("/auth/logout");

function refreshTokenApi() {
  return baseRequestClient.post<{
    expire: number;
    accessToken: string;
    refreshExpire: number;
    refreshToken: string;
  }>("/auth/refresh/token", {
    withCredentials: true,
  });
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
