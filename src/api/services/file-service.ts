import { requestClient } from "../request";

/** 文件上传响应 */
export interface FileUploadRes {
  id: number;
  fileName: string;
  filePath: string;
  fileSize?: number;
  mimeType?: string;
}

/**
 * 文件服务基础地址
 * 如果使用 Minio 等对象存储，请配置为对应的访问地址
 * 例如: "https://minio.example.com" 或留空使用 API 代理
 */
const FILE_BASE_URL = import.meta.env.VITE_FILE_BASE_URL || "";

/**
 * 获取完整的文件 URL
 * 如果是相对路径，则拼接文件服务基础地址
 * @param path 文件路径，后端返回格式为 /file/{bucketName}/{fileName}
 * @returns 完整的文件 URL
 */
export const getFileUrl = (path: string | undefined): string | undefined => {
  if (!path) {
    return;
  }
  // 如果已经是完整 URL，直接返回
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // 如果配置了文件服务基础地址（如 Minio 直接访问）
  if (FILE_BASE_URL) {
    // 后端返回格式: /file/{bucketName}/{fileName}
    // Minio 访问格式: {baseUrl}/{bucketName}/{fileName}
    // 移除 /file 前缀
    const minioPath = path.startsWith("/file/") ? path.slice(5) : path;
    return `${FILE_BASE_URL}${minioPath.startsWith("/") ? "" : "/"}${minioPath}`;
  }
  // 默认通过 API 代理访问
  return `/api${path.startsWith("/") ? "" : "/"}${path}`;
};

/**
 * 从用户信息中获取头像 URL
 * @param userInfo 用户信息对象
 * @returns 头像完整 URL
 */
export const getAvatarUrl = (userInfo: {
  avatarEntity?: { filePath?: string };
}): string | undefined => {
  const path = userInfo.avatarEntity?.filePath;
  return getFileUrl(path);
};

/**
 * 上传文件
 * @param file 文件对象
 * @returns 上传结果
 */
const upload = (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  return requestClient.post<FileUploadRes>("/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * 上传头像
 * @param file 图片文件
 * @returns 上传结果
 */
const uploadAvatar = (file: File) => {
  // 验证文件类型
  if (!file.type.startsWith("image/")) {
    return Promise.reject(new Error("请选择图片文件"));
  }

  // 验证文件大小 (最大 10MB)
  if (file.size > 10 * 1024 * 1024) {
    return Promise.reject(new Error("图片大小不能超过 2MB"));
  }

  return upload(file);
};

export default {
  upload,
  uploadAvatar,
};
