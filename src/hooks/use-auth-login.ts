import { useState } from "react";
import authService from "@/api/services/auth-service";
import type { SignInReq } from "@/api/services/user-service";
import userService from "@/api/services/user-service";
import { useUserActions } from "@/store/user-store";
export interface UseAuthLoginReturn {
  /**
   * 执行登录并加载菜单
   */
  login: (credentials: Omit<SignInReq, "publicKey">) => Promise<void>;

  /**
   * 登录状态
   */
  isLoading: boolean;
}

// 将 PEM 格式公钥转换为 CryptoKey
function importPublicKey(pem: string): Promise<CryptoKey> {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem
    .replace(pemHeader, "")
    .replace(pemFooter, "")
    .replace(/\s/g, "");
  const binaryDer = Uint8Array.from(atob(pemContents), (c) => c.charCodeAt(0));

  return crypto.subtle.importKey(
    "spki",
    binaryDer,
    { name: "RSA-OAEP", hash: "SHA-256" },
    false,
    ["encrypt"]
  );
}

// 使用 OAEP 加密
async function encryptWithPublicKey(
  publicKeyPem: string,
  data: string
): Promise<string> {
  const publicKey = await importPublicKey(publicKeyPem);
  const encoded = new TextEncoder().encode(data);
  const encrypted = await crypto.subtle.encrypt(
    { name: "RSA-OAEP" },
    publicKey,
    encoded
  );
  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

export function useAuthLogin(): UseAuthLoginReturn {
  const [isLoading, setIsLoading] = useState(false);

  const { setUserToken } = useUserActions();
  const login = async (credentials: Omit<SignInReq, "publicKey">) => {
    setIsLoading(true);

    try {
      const publicKey = await authService.getPublicKey();
      console.log("publicKey", publicKey);
      // 使用 Web Crypto API 加密（OAEP 填充）
      const encryptedPassword = await encryptWithPublicKey(
        publicKey,
        credentials.password
      );
      console.log("encryptedPassword", encryptedPassword);
      const signInRes = await userService.signin({
        ...credentials,
        password: encryptedPassword,
        publicKey,
      });
      console.log("signInRes", signInRes);
      const { accessToken, refreshToken } = signInRes;
      setUserToken({ accessToken, refreshToken });
      // // 保存 token 和用户信息
      // setUserToken({ accessToken, refreshToken });
      // setUserInfo(user);
      // const menuList = await menuService.getMenuList();
      // setBackendMenu(menuList);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
  };
}

export default useAuthLogin;
