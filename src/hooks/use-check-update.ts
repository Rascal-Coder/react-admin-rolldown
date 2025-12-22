import { useCallback, useEffect, useRef, useState } from "react";
import { GLOBAL_CONFIG } from "@/global-config";

export interface UseCheckUpdateOptions {
  /**
   * 是否启用更新检测
   * @default true
   */
  enabled?: boolean;
  /**
   * 轮询间隔时间（分钟）
   * @default 1
   */
  interval?: number;
  /**
   * 检查更新的 URL
   * @default import.meta.env.VITE_APP_BASENAME || '/'
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
    enabled = true,
    interval = 1,
    checkUrl = basename || "/",
    disableInDev = true,
  } = options;

  const [hasUpdate, setHasUpdate] = useState(false);
  const [currentVersion, setCurrentVersion] = useState("");
  const lastVersionRef = useRef<string>("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isCheckingRef = useRef(false);

  // 日志输出：Hook 初始化
  console.log("[CheckUpdate] Hook 初始化", {
    enabled,
    interval: `${interval} 分钟`,
    checkUrl,
    disableInDev,
  });

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
      console.log("[CheckUpdate] 跳过检查：上一次检查仍在进行中");
      return;
    }

    console.log("[CheckUpdate] 开始检查更新...");
    isCheckingRef.current = true;

    try {
      const versionTag = await getVersionTag();
      if (!versionTag) {
        console.log("[CheckUpdate] 未获取到版本标识");
        return;
      }
      console.log("[CheckUpdate] 获取到版本标识:", versionTag);

      // 首次运行时记录版本，不提示更新
      if (!lastVersionRef.current) {
        lastVersionRef.current = versionTag;
        console.log("[CheckUpdate] 首次运行，记录初始版本");
        return;
      }

      // 版本变化时提示更新
      if (lastVersionRef.current !== versionTag) {
        console.log("[CheckUpdate] 检测到版本变化！", {
          旧版本: lastVersionRef.current,
          新版本: versionTag,
        });
        setCurrentVersion(versionTag);
        setHasUpdate(true);
        // 停止轮询
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          console.log("[CheckUpdate] 已停止轮询");
        }
      } else {
        console.log("[CheckUpdate] 版本未变化，无需更新");
      }
    } finally {
      isCheckingRef.current = false;
    }
  }, [getVersionTag]);

  // 启动轮询
  const startPolling = useCallback(() => {
    if (!enabled || interval <= 0 || (disableInDev && isDev)) {
      console.log("[CheckUpdate] 轮询未启动", {
        enabled,
        interval,
        isDev,
        disableInDev,
      });
      return;
    }
    // 清除已有定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    console.log(`[CheckUpdate] 启动轮询，间隔: ${interval} 分钟`);
    timerRef.current = setInterval(
      checkForUpdates,
      interval * 60 * 1000 // 转换为毫秒
    );
  }, [enabled, interval, checkForUpdates, disableInDev, isDev]);

  // 停止轮询
  const stopPolling = useCallback(() => {
    if (timerRef.current) {
      console.log("[CheckUpdate] 停止轮询");
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 页面可见性变化处理
  const handleVisibilityChange = useCallback(() => {
    if (document.hidden) {
      console.log("[CheckUpdate] 页面已隐藏，停止轮询");
      stopPolling();
    } else {
      console.log("[CheckUpdate] 页面已显示，立即检查更新");
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
    console.log("[CheckUpdate] 用户确认刷新页面", {
      版本: currentVersion,
    });
    lastVersionRef.current = currentVersion;
    window.location.reload();
  }, [currentVersion]);

  // 忽略本次更新
  const dismiss = useCallback(() => {
    console.log("[CheckUpdate] 用户忽略本次更新", {
      版本: currentVersion,
    });
    lastVersionRef.current = currentVersion;
    setHasUpdate(false);
    startPolling();
  }, [currentVersion, startPolling]);

  // 监听 enabled 变化，控制轮询启停
  useEffect(() => {
    if (enabled) {
      startPolling();
    } else {
      stopPolling();
    }
  }, [enabled, startPolling, stopPolling]);

  // 初始化
  useEffect(() => {
    if (enabled) {
      startPolling();
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [enabled, startPolling, stopPolling, handleVisibilityChange]);

  return {
    hasUpdate,
    refresh,
    dismiss,
  };
}
