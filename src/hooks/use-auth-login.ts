import { useCallback, useState } from "react";
import type { SignInReq } from "@/api/services/user-service";
import userService from "@/api/services/user-service";
import { useUserActions } from "@/store/user-store";

export interface UseAuthLoginReturn {
  /**
   * 执行登录并加载菜单
   */
  login: (credentials: SignInReq) => Promise<void>;

  /**
   * 登录状态
   */
  isLoading: boolean;
}
export function useAuthLogin(): UseAuthLoginReturn {
  const [isLoading, setIsLoading] = useState(false);

  const { setUserToken, setUserInfo } = useUserActions();

  const login = useCallback(
    async (credentials: SignInReq) => {
      setIsLoading(true);

      try {
        const signInRes = await userService.signin(credentials);
        const { user, accessToken, refreshToken } = signInRes;

        // 保存 token 和用户信息
        setUserToken({ accessToken, refreshToken });
        setUserInfo(user);
      } finally {
        setIsLoading(false);
      }
    },
    [setUserToken, setUserInfo]
  );

  return {
    login,
    isLoading,
  };
}

export default useAuthLogin;
