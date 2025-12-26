import { useCallback } from "react";
import { GLOBAL_CONFIG } from "@/global-config";
import { useRouterContext } from "@/lib/router-toolset/router-context";
import { useMenuActions } from "@/store/menu-store";
import { useUserActions } from "@/store/user-store";

export interface UseAuthLogoutReturn {
  /**
   * 执行登出并清理路由
   */
  logout: () => void;
}

export function useAuthLogout(): UseAuthLogoutReturn {
  const { clearUserInfoAndToken } = useUserActions();
  const { clearMenuData } = useMenuActions();
  const { updateRoutes } = useRouterContext();

  const logout = useCallback(() => {
    clearUserInfoAndToken();

    if (GLOBAL_CONFIG.authRouteMode === "backend") {
      // 传入空数组清除所有动态路由，只保留静态路由
      updateRoutes([]);
    }

    clearMenuData();
  }, [clearUserInfoAndToken, clearMenuData, updateRoutes]);

  return {
    logout,
  };
}

export default useAuthLogout;
