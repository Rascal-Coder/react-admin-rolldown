import type { RequestClient } from "../request-client";
import type { RequestClientConfig } from "../types";

class FileUploader {
  private readonly client: RequestClient;

  constructor(client: RequestClient) {
    this.client = client;
  }

  public upload<T = any>(
    url: string,
    data: Record<string, any> & { file: Blob | File },
    config?: RequestClientConfig
  ): Promise<T> {
    const formData = new FormData();

    const entries = Object.entries(data);
    for (const [key, value] of entries) {
      if (Array.isArray(value)) {
        for (const [index, item] of value.entries()) {
          if (item !== undefined) {
            formData.append(`${key}[${index}]`, item);
          }
        }
      } else if (value !== undefined) {
        formData.append(key, value);
      }
    }

    const finalConfig: RequestClientConfig = {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    };

    return this.client.post(url, formData, finalConfig);
  }
}

export { FileUploader };
