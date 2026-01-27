import type { UserInfo, UserToken } from "@/types/user";
import { requestClient } from "../request";

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

/** 更新用户信息请求参数 */
export interface UpdateUserInfoReq {
  id: string;
  /** 用户名称 */
  userName?: string;
  /** 用户昵称 */
  nickName?: string;
  /** 手机号 */
  phoneNumber?: string;
  /** 邮箱 */
  email?: string;
  /** 性别（0:女，1:男） */
  sex?: number;
  /** 头像文件 ID */
  avatar?: number;
}

const signin = (data: SignInReq) =>
  requestClient.post<SignInRes>("/auth/login", data);

/** 根据 ID 查询用户 */
const findById = (id: string) => requestClient.get<UserInfo>(`/user/${id}`);

/** 编辑用户信息 */
const updateUserInfo = (data: UpdateUserInfoReq) =>
  requestClient.put<UserInfo>("/user", data);

/** 分页查询用户列表 */
const getUserPage = (params: {
  page: number;
  size: number;
  nickName?: string;
  phoneNumber?: string;
}) =>
  requestClient.get<{ list: UserInfo[]; total: number }>("/user/page", {
    params,
  });

export default {
  signin,
  findById,
  updateUserInfo,
  getUserPage,
};
