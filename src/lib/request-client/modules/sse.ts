import type { AxiosRequestHeaders, InternalAxiosRequestConfig } from "axios";

import type { RequestClient } from "../request-client";
import type { SseRequestOptions } from "../types";

// 顶层正则表达式，避免重复创建
const ABSOLUTE_URL_REGEX = /^https?:\/\//i;
const TRAILING_SLASH_REGEX = /\/+$/;
const LEADING_SLASH_REGEX = /^\/+/;

function safeJoinUrl(baseUrl: string | undefined, url: string): string {
  if (!baseUrl) {
    return url;
  }

  if (ABSOLUTE_URL_REGEX.test(url)) {
    return url;
  }

  if (ABSOLUTE_URL_REGEX.test(baseUrl)) {
    return new URL(url, baseUrl).toString();
  }

  return `${baseUrl.replace(TRAILING_SLASH_REGEX, "")}/${url.replace(LEADING_SLASH_REGEX, "")}`;
}

/**
 * SSE模块
 */
class SSE {
  private readonly client: RequestClient;

  constructor(client: RequestClient) {
    this.client = client;
  }

  public postSSE(url: string, data?: any, requestOptions?: SseRequestOptions) {
    return this.requestSSE(url, data, {
      ...requestOptions,
      method: "POST",
    });
  }

  /**
   * SSE请求方法
   * @param url - 请求URL
   * @param data - 请求数据
   * @param requestOptions - SSE请求选项
   */
  public async requestSSE(
    url: string,
    data?: any,
    requestOptions?: SseRequestOptions
  ) {
    const axiosConfig = await this.buildAxiosConfig(url, requestOptions);
    const merged = this.buildHeaders(axiosConfig, requestOptions);
    const bodyInit = this.buildBody(requestOptions?.body ?? data, merged);

    const requestInit: RequestInit = {
      ...requestOptions,
      method: axiosConfig.method,
      headers: merged,
      body: bodyInit,
    };

    const baseUrl = this.client.getBaseUrl() || "";
    const response = await fetch(safeJoinUrl(baseUrl, url), requestInit);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    await this.processStream(response, requestOptions);
  }

  private async buildAxiosConfig(
    url: string,
    requestOptions?: SseRequestOptions
  ): Promise<InternalAxiosRequestConfig<any>> {
    let axiosConfig: InternalAxiosRequestConfig<any> = {
      url,
      method: (requestOptions?.method as any) ?? "GET",
      headers: {} as AxiosRequestHeaders,
    };

    const requestInterceptors = this.client.instance.interceptors
      .request as any;
    if (requestInterceptors.handlers?.length > 0) {
      for (const handler of requestInterceptors.handlers) {
        if (typeof handler?.fulfilled === "function") {
          const next = await handler.fulfilled(axiosConfig as any);
          if (next) {
            axiosConfig = next as InternalAxiosRequestConfig<any>;
          }
        }
      }
    }

    return axiosConfig;
  }

  private buildHeaders(
    axiosConfig: InternalAxiosRequestConfig<any>,
    requestOptions?: SseRequestOptions
  ): Headers {
    const merged = new Headers();

    for (const [k, v] of Object.entries(
      (axiosConfig.headers ?? {}) as Record<string, string>
    )) {
      merged.set(k, String(v));
    }

    if (requestOptions?.headers) {
      for (const [k, v] of new Headers(requestOptions.headers)) {
        merged.set(k, v);
      }
    }

    if (!merged.has("accept")) {
      merged.set("accept", "text/event-stream");
    }

    return merged;
  }

  private buildBody(data: any, headers: Headers): any {
    const ct = (headers.get("content-type") || "").toLowerCase();
    if (
      data &&
      typeof data === "object" &&
      !ArrayBuffer.isView(data as any) &&
      !(data instanceof ArrayBuffer) &&
      !(data instanceof Blob) &&
      !(data instanceof FormData) &&
      ct.includes("application/json")
    ) {
      return JSON.stringify(data);
    }
    return data;
  }

  private async processStream(
    response: Response,
    requestOptions?: SseRequestOptions
  ): Promise<void> {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error("No reader");
    }

    let isEnd = false;
    while (!isEnd) {
      const { done, value } = await reader.read();
      if (done) {
        isEnd = true;
        decoder.decode(new Uint8Array(0), { stream: false });
        requestOptions?.onEnd?.();
        reader.releaseLock?.();
        break;
      }
      const content = decoder.decode(value, { stream: true });
      requestOptions?.onMessage?.(content);
    }
  }
}

export { SSE };
