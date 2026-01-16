import apiClient from "../api-client";

export interface CaptchaResult {
  id: string;
  imageBase64: string;
}

const getPublicKey = () => apiClient.get<string>({ url: "/auth/publicKey" });

const getCaptcha = () => apiClient.get<CaptchaResult>({ url: "/auth/captcha" });

const logout = () => apiClient.post<void>({ url: "/auth/logout" });
export default {
  getPublicKey,
  getCaptcha,
  logout,
};
