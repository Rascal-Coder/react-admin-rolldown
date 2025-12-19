import { useCallback, useEffect, useRef, useState } from "react";
import type { Watermark, WatermarkOptions } from "watermark-js-plus";

// 默认配置选项
const defaultOptions: Partial<WatermarkOptions> = {
  advancedStyle: {
    colorStops: [
      {
        color: "#ec4899", // 浅灰色，在黑色遮罩层上更明显
        offset: 0,
      },
      {
        color: "#ec4899",
        offset: 1,
      },
    ],
    type: "linear",
  },
  content: "",
  contentType: "multi-line-text",
  globalAlpha: 0.25,
  gridLayoutOptions: {
    cols: 2,
    gap: [20, 20],
    matrix: [
      [1, 0],
      [0, 1],
    ],
    rows: 2,
  },
  height: 200,
  layout: "grid",
  rotate: 30,
  width: 160,
};

export function useWatermark() {
  // 使用 useRef 存储水印实例，避免重渲染
  const watermarkRef = useRef<Watermark | undefined>(undefined);
  // 使用 useRef 缓存配置选项
  const cachedOptionsRef = useRef<Partial<WatermarkOptions>>(defaultOptions);
  // 使用 useState 触发重渲染（如果需要）
  const [isInitialized, setIsInitialized] = useState(false);

  // 初始化水印
  const initWatermark = async (options: Partial<WatermarkOptions>) => {
    const { Watermark: WatermarkPlus } = await import("watermark-js-plus");

    cachedOptionsRef.current = {
      ...cachedOptionsRef.current,
      ...options,
    };
    watermarkRef.current = new WatermarkPlus(cachedOptionsRef.current);
    await watermarkRef.current?.create();
    setIsInitialized(true);
  };

  // 更新水印
  const updateWatermark = async (options: Partial<WatermarkOptions>) => {
    if (watermarkRef.current) {
      await watermarkRef.current?.changeOptions({
        ...cachedOptionsRef.current,
        ...options,
      });
      cachedOptionsRef.current = {
        ...cachedOptionsRef.current,
        ...options,
      };
    } else {
      await initWatermark(options);
    }
  };

  // 销毁水印
  const destroyWatermark = useCallback(() => {
    if (watermarkRef.current) {
      watermarkRef.current.destroy();
      watermarkRef.current = undefined;
      setIsInitialized(false);
    }
  }, []);

  // 在组件卸载时自动清理水印

  useEffect(
    () => () => {
      destroyWatermark();
    },
    [destroyWatermark]
  );

  return {
    destroyWatermark,
    updateWatermark,
    watermark: watermarkRef.current,
    isInitialized,
  };
}
