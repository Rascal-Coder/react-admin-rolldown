import { requestClient } from "../request";

/** 此处后端没有提供注释 GET /auth/captcha */
export async function auth_authcontroller_getimagecaptcha(options?: {
  [key: string]: any;
}) {
  return requestClient.request<API.CaptchaVO>("/auth/captcha", {
    method: "GET",
    ...(options || {}),
  });
}

/** 获取当前用户 GET /auth/current/user */
export async function auth_authcontroller_getcurrentuser(options?: {
  [key: string]: any;
}) {
  return requestClient.request<API.UserVO>("/auth/current/user", {
    method: "GET",
    ...(options || {}),
  });
}

/** 登录 POST /auth/login */
export async function auth_authcontroller_login(
  body: API.LoginDTO,
  options?: { [key: string]: any }
) {
  return requestClient.request<API.TokenVO>("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录 POST /auth/logout */
export async function auth_authcontroller_logout(options?: {
  [key: string]: any;
}) {
  return requestClient.request<any>("/auth/logout", {
    method: "POST",
    ...(options || {}),
  });
}

/** 获取公钥 GET /auth/publicKey */
export async function auth_authcontroller_getpublickey(options?: {
  [key: string]: any;
}) {
  return requestClient.request<API.PublicKeyVO>("/auth/publicKey", {
    method: "GET",
    ...(options || {}),
  });
}

/** 刷新token POST /auth/refresh/token */
export async function auth_authcontroller_refreshtoken(
  body: API.RefreshTokenDTO,
  options?: { [key: string]: any }
) {
  return requestClient.request<API.TokenVO>("/auth/refresh/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 重置密码 POST /auth/reset/password */
export async function auth_authcontroller_resetpassword(
  body: API.ResetPasswordDTO,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/auth/reset/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 发送密码重置邮件 POST /auth/send/reset/password/email */
export async function auth_authcontroller_sendresetpasswordemail(
  body: Record<string, any>,
  options?: { [key: string]: any }
) {
  return requestClient.request<any>("/auth/send/reset/password/email", {
    method: "POST",
    headers: {
      "Content-Type": "text/plain",
    },
    data: body,
    ...(options || {}),
  });
}
