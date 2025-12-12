import { useEffect, useRef, useState } from "react";

/**
 * 监听元素高度变化的 Hook
 * @returns [ref, height] - ref 用于绑定到元素，height 为元素的实际高度
 *
 * @example
 * const [headerRef, headerHeight] = useElementHeight<HTMLElement>();
 * return <header ref={headerRef}>...</header>
 */
export function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    // 初始化时获取高度
    const updateHeight = () => {
      const rect = element.getBoundingClientRect();
      setHeight(rect.height);
    };

    // 立即获取一次高度
    updateHeight();

    // 使用 ResizeObserver 监听元素尺寸变化
    const resizeObserver = new ResizeObserver(() => {
      updateHeight();
    });

    resizeObserver.observe(element);

    // 也监听窗口尺寸变化（某些情况下 ResizeObserver 可能不触发）
    window.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return [ref, height] as const;
}
