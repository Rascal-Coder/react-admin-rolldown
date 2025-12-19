import { useCallback, useEffect, useRef, useState } from "react";
import { GLOBAL_CONFIG } from "@/global-config";

export interface UseCheckUpdateOptions {
  /**
   * 轮询间隔时间（分钟）
   * @default 1
   */
  interval?: number;
  /**
   * 检查更新的 URL
   * @default import.meta.env.BASE_URL || '/'
   */
  checkUrl?: string;
  /**
   * 是否在开发环境禁用
   * @default true
   */
  disableInDev?: boolean;
}

export interface UseCheckUpdateReturn {
  /** 是否有新版本 */
  hasUpdate: boolean;
  /** 当前版本标识 */
  currentVersion: string;
  /** 手动检查更新 */
  checkNow: () => Promise<void>;
  /** 刷新页面 */
  refresh: () => void;
  /** 忽略本次更新 */
  dismiss: () => void;
}

/**
 * 版本更新检测 Hook
 * 通过比较服务器资源的 ETag 或 Last-Modified 来检测版本变化
 */
export function useCheckUpdate(
  options: UseCheckUpdateOptions = {}
): UseCheckUpdateReturn {
  const basename = GLOBAL_CONFIG.basename;
  const {
    interval = 1,
    checkUrl = basename || "/",
    disableInDev = true,
  } = options;

  const [hasUpdate, setHasUpdate] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("");
  const lastVersionRef = useRef<string>("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isCheckingRef = useRef(false);

  // 判断是否为开发环境
  const isDev =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1");

  // 获取版本标识
  const getVersionTag = useCallback(async (): Promise<string | null> => {
    if (disableInDev && isDev) {
      return null;
    }

    try {
      const response = await fetch(checkUrl, {
        cache: "no-cache",
        method: "HEAD",
        redirect: "manual",
      });

      return (
        response.headers.get("etag") || response.headers.get("last-modified")
      );
    } catch (error) {
      console.error("[CheckUpdate] Failed to fetch version tag:", error);
      return null;
    }
  }, [checkUrl, disableInDev, isDev]);

  // 检查更新
  const checkForUpdates = useCallback(async () => {
    if (isCheckingRef.current) {
      return;
    }

    isCheckingRef.current = true;

    try {
      const versionTag = await getVersionTag();

      if (!versionTag) {
        return;
      }

      // 首次运行时记录版本，不提示更新
      if (!lastVersionRef.current) {
        lastVersionRef.current = versionTag;
        return;
      }

      // 版本变化时提示更新
      if (lastVersionRef.current !== versionTag) {
        setCurrentVersion(versionTag);
        setHasUpdate(true);
        // 停止轮询
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      }
    } finally {
      isCheckingRef.current = false;
    }
  }, [getVersionTag]);

  // 启动轮询
  const startPolling = useCallback(() => {
    if (interval <= 0 || (disableInDev && isDev)) {
      return;
    }

    // 清除已有定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(
      checkForUpdates,
      interval * 60 * 1000 // 转换为毫秒
    );
  }, [interval, checkForUpdates, disableInDev, isDev]);

  // 停止轮询
  const stopPolling = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 页面可见性变化处理
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      stopPolling();
    } else {
      // 页面可见时立即检查一次，然后恢复轮询
      checkForUpdates().finally(() => {
        if (!hasUpdate) {
          startPolling();
        }
      });
    }
  }, [stopPolling, checkForUpdates, startPolling, hasUpdate]);

  // 刷新页面
  const refresh = useCallback(() => {
    lastVersionRef.current = currentVersion;
    window.location.reload();
  }, [currentVersion]);

  // 忽略本次更新
  const dismiss = useCallback(() => {
    lastVersionRef.current = currentVersion;
    setHasUpdate(false);
    startPolling();
  }, [currentVersion, startPolling]);

  // 手动检查
  const checkNow = useCallback(async () => {
    await checkForUpdates();
  }, [checkForUpdates]);

  // 初始化
  useEffect(() => {
    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startPolling, stopPolling, handleVisibilityChange]);

  return {
    hasUpdate,
    currentVersion,
    checkNow,
    refresh,
    dismiss,
  };
}
