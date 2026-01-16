import { useCallback } from "react";
import authService from "@/api/services/auth-service";
import { GLOBAL_CONFIG } from "@/global-config";
import { useMenuActions } from "@/store/menu-store";
import { useRouterStore } from "@/store/router-store";
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
  const { actions } = useRouterStore();

  const logout = useCallback(async () => {
    await authService.logout();
    clearUserInfoAndToken();

    if (GLOBAL_CONFIG.authRouteMode === "backend") {
      // 传入空数组清除所有动态路由，只保留静态路由
      actions.setRouterState([], [], new Map());
    }

    clearMenuData();
  }, [clearUserInfoAndToken, clearMenuData, actions]);

  return {
    logout,
  };
}

export default useAuthLogout;
