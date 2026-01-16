import axios from "axios";
import type { RequestClient } from "./request-client";
import type { MakeErrorMessageFn, ResponseInterceptorConfig } from "./types";

const isFunction = (val: unknown): val is (...args: any[]) => any =>
  typeof val === "function";

const checkSuccess = (
  successCode: ((code: any) => boolean) | number | string,
  codeValue: any
): boolean =>
  isFunction(successCode) ? successCode(codeValue) : codeValue === successCode;

const extractData = (
  dataField: ((response: any) => any) | string,
  responseData: any
): any =>
  isFunction(dataField) ? dataField(responseData) : responseData[dataField];

export const defaultResponseInterceptor = ({
  codeField = "code",
  dataField = "data",
  successCode = 0,
}: {
  /** 响应数据中代表访问结果的字段名 */
  codeField: string;
  /** 响应数据中装载实际数据的字段名，或者提供一个函数从响应数据中解析需要返回的数据 */
  dataField: ((response: any) => any) | string;
  /** 当codeField所指定的字段值与successCode相同时，代表接口访问成功。如果提供一个函数，则返回true代表接口访问成功 */
  successCode: ((code: any) => boolean) | number | string;
}): ResponseInterceptorConfig => ({
  fulfilled: (response) => {
    const { config, data: responseData, status } = response;

    if (config.responseReturn === "raw") {
      return response;
    }
    if (config.responseReturn === "body") {
      return responseData;
    }

    const isValidStatus = status >= 200 && status < 400;
    const isSuccess = checkSuccess(successCode, responseData[codeField]);

    if (isValidStatus && isSuccess) {
      return extractData(dataField, responseData);
    }
    throw new Error(JSON.stringify({ ...response, response }));
  },
});

export const authenticateResponseInterceptor = ({
  client,
  doReAuthenticate,
  doRefreshToken,
  enableRefreshToken,
  formatToken,
}: {
  client: RequestClient;
  doReAuthenticate: () => Promise<void>;
  doRefreshToken: () => Promise<string>;
  enableRefreshToken: boolean;
  formatToken: (token: string) => undefined | string;
}): ResponseInterceptorConfig => {
  return {
    rejected: async (error) => {
      const { config, response } = error;
      // 如果不是 401 错误，直接抛出异常
      if (response?.status !== 401) {
        throw error;
      }
      // 判断是否启用了 refreshToken 功能
      // 如果没有启用或者已经是重试请求了，直接跳转到重新登录
      if (!enableRefreshToken || config.__isRetryRequest) {
        await doReAuthenticate();
        throw error;
      }
      // 如果正在刷新 token，则将请求加入队列，等待刷新完成
      if (client.isRefreshing) {
        return new Promise((resolve) => {
          client.refreshTokenQueue.push((newToken: string) => {
            config.headers.Authorization = formatToken(newToken);
            resolve(client.request(config.url, { ...config }));
          });
        });
      }

      // 标记开始刷新 token
      client.isRefreshing = true;
      // 标记当前请求为重试请求，避免无限循环
      config.__isRetryRequest = true;

      try {
        const newToken = await doRefreshToken();

        // 处理队列中的请求
        for (const callback of client.refreshTokenQueue) {
          callback(newToken);
        }
        // 清空队列
        client.refreshTokenQueue = [];

        return client.request(error.config.url, { ...error.config });
      } catch (refreshError) {
        // 如果刷新 token 失败，处理错误（如强制登出或跳转登录页面）
        for (const callback of client.refreshTokenQueue) {
          callback("");
        }
        client.refreshTokenQueue = [];
        console.error("Refresh token failed, please login again.");
        await doReAuthenticate();

        throw refreshError;
      } finally {
        client.isRefreshing = false;
      }
    },
  };
};

export const errorMessageResponseInterceptor = (
  makeErrorMessage?: MakeErrorMessageFn
): ResponseInterceptorConfig => ({
  rejected: (error: any) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const err: string = error?.toString?.() ?? "";
    let errMsg = "";
    if (err?.includes("Network Error")) {
      errMsg = "网络错误";
    } else if (error?.message?.includes?.("timeout")) {
      errMsg = "请求超时";
    }
    if (errMsg) {
      makeErrorMessage?.(errMsg, error);
      return Promise.reject(error);
    }

    let errorMessage = "";
    const status = error?.response?.status;

    switch (status) {
      case 400: {
        errorMessage = "请求参数错误";
        break;
      }
      case 401: {
        errorMessage = "未授权，请重新登录";
        break;
      }
      case 403: {
        errorMessage = "拒绝访问";
        break;
      }
      case 404: {
        errorMessage = "请求资源不存在";
        break;
      }
      case 408: {
        errorMessage = "请求超时";
        break;
      }
      default: {
        errorMessage = "服务器内部错误";
      }
    }
    makeErrorMessage?.(errorMessage, error);
    return Promise.reject(error);
  },
});
