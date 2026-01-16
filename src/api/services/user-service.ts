import type { UserToken } from "@/types/user";
import apiClient from "../api-client";

export interface SignInReq {
  accountNumber: string;
  password: string;
  captcha: string;
  captchaId: string;
  publicKey: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}
export type SignInRes = UserToken;

export enum UserApi {
  SignIn = "/auth/login",
  User = "/user",
}

const signin = (data: SignInReq) =>
  apiClient.post<SignInRes>({ url: UserApi.SignIn, data });
// const findById = (id: string) =>
//   apiClient.get<UserInfo[]>({ url: `${UserApi.User}/${id}` });

export default {
  signin,
  // findById,
};
