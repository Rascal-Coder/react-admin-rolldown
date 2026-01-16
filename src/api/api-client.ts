import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { toast } from "sonner";
import { ResultStatus } from "#/enum";
import userStore from "@/store/user-store";

interface Result<T = unknown> {
  status: ResultStatus;
  message: string;
  data: T;
}

/**
 * 扩展 AxiosRequestConfig，添加自定义配置项
 */
interface CustomRequestConfig extends AxiosRequestConfig {
  /**
   * 定义期望获得的数据类型
   * - body: 只返回响应数据的 body 部分（默认，会解析 Result 结构）
   * - raw: 原始的 AxiosResponse，包括 headers、status 等
   */
  responseReturn?: "body" | "raw";
}

const axiosInstance = axios.create({
  baseURL: "/api",
  timeout: 50_000,
  headers: { "Content-Type": "application/json;charset=utf-8" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = userStore.getState().userToken.accessToken;
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res: AxiosResponse<Result<any>>) => {
    const config = res.config as CustomRequestConfig;

    // 返回原始响应
    if (config.responseReturn === "raw") {
      return res;
    }

    // 处理流式响应或 blob，直接返回 body
    if (
      config.responseType === "stream" ||
      config.responseType === "blob" ||
      config.responseType === "arraybuffer"
    ) {
      return res.data;
    }

    // 处理纯文本响应
    const contentType = res.headers["content-type"] || "";
    if (
      contentType.includes("text/plain") ||
      contentType.includes("text/html") ||
      contentType.includes("text/event-stream")
    ) {
      return res.data;
    }

    // 处理标准 JSON 响应
    if (!res.data) {
      throw new Error("请求出错，请稍后重试");
    }

    // 如果响应不是标准 Result 格式，直接返回
    if (typeof res.data !== "object" || !("status" in res.data)) {
      return res.data;
    }

    const { status, data, message } = res.data;
    if (status === ResultStatus.SUCCESS) {
      return data;
    }
    throw new Error(message || "请求出错，请稍后重试");
  },
  (error: AxiosError<Result>) => {
    const { response, message } = error || {};
    const errMsg = response?.data?.message || message || "操作失败，系统异常！";
    toast.error(errMsg, { position: "top-center" });
    return Promise.reject(error);
  }
);

class APIClient {
  get<T = unknown>(config: CustomRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "GET" });
  }
  post<T = unknown>(config: CustomRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "POST" });
  }
  put<T = unknown>(config: CustomRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "PUT" });
  }
  delete<T = unknown>(config: CustomRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }
  request<T = unknown>(config: CustomRequestConfig): Promise<T> {
    return axiosInstance.request<any, T>(config);
  }
}

export default new APIClient();
