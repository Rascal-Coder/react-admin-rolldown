import { toast } from "sonner";
import { GLOBAL_CONFIG } from "@/global-config";
import {
  authenticateResponseInterceptor,
  defaultResponseInterceptor,
  errorMessageResponseInterceptor,
} from "@/lib/request-client/preset-interceptors";
import { RequestClient } from "@/lib/request-client/request-client";
import type { RequestClientOptions } from "@/lib/request-client/types";
import { useMenuStore } from "@/store/menu-store";
import { useRouterStore } from "@/store/router-store";
import userStore from "@/store/user-store";
import authService from "./services/auth-service";
// 基础请求客户端，不带拦截器，用于登出等特殊场景
export const baseRequestClient = new RequestClient({ baseURL: "/api" });

function createRequestClient(baseURL: string, options?: RequestClientOptions) {
  const client = new RequestClient({
    ...options,
    baseURL,
  });

  /**
   * 重新认证逻辑
   * 当 access token 和 refresh token 都失效时执行
   */
  async function doReAuthenticate(): Promise<void> {
    console.warn("Access token or refresh token is invalid or expired.");

    // 调用后端登出接口（使用 baseRequestClient 避免触发拦截器循环）
    try {
      await authService.logout();
    } catch {
      // 登出接口失败不影响前端清理流程
    }

    // 清除用户信息和 token
    const { clearUserInfoAndToken } = userStore.getState().actions;
    clearUserInfoAndToken();

    // 清除菜单数据
    const { clearMenuData } = useMenuStore.getState().actions;
    clearMenuData();

    // 如果是后端路由模式，清除动态路由
    if (GLOBAL_CONFIG.authRouteMode === "backend") {
      const { setRouterState } = useRouterStore.getState().actions;
      setRouterState([], [], new Map());
    }
  }

  /**
   * 刷新token逻辑
   */
  async function doRefreshToken() {
    const { setUserToken } = userStore.getState().actions;
    const resp = await authService.refreshTokenApi();

    const newToken = resp.data.accessToken;

    setUserToken({
      accessToken: newToken,
      refreshToken: resp.data.refreshToken,
    });
    return newToken;
  }

  function formatToken(token: undefined | string) {
    return token ? `Bearer ${token}` : undefined;
  }

  // 请求头处理
  client.addRequestInterceptor({
    fulfilled: (config) => {
      const accessToken = userStore.getState().userToken.accessToken;

      config.headers.Authorization = formatToken(accessToken);
      return config;
    },
  });

  // 处理返回的响应数据格式
  client.addResponseInterceptor(
    defaultResponseInterceptor({
      codeField: "code",
      dataField: "data",
      successCode: 0,
    })
  );

  // token过期的处理
  client.addResponseInterceptor(
    authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken,
      enableRefreshToken: true,
      formatToken,
      // getRefreshToken: () => userStore.getState().userToken.refreshToken,
    })
  );

  // 通用的错误处理,如果没有进入上面的错误处理逻辑，就会进入这里
  client.addResponseInterceptor(
    errorMessageResponseInterceptor((msg: string, error) => {
      // 这里可以根据业务进行定制,你可以拿到 error 内的信息进行定制化处理，根据不同的 code 做不同的提示，而不是直接使用 message.error 提示 msg
      // 当前mock接口返回的错误字段是 error 或者 message
      const responseData = error?.response?.data ?? {};
      const errorMessage = responseData?.error ?? responseData?.message ?? "";
      // 如果没有错误信息，则会根据状态码进行提示
      toast.error(errorMessage || msg, { position: "top-center" });
    })
  );

  return client;
}

export const requestClient = createRequestClient("/api", {
  responseReturn: "data",
});
