import type { BrowserHistory } from "history";
import { useLayoutEffect, useState } from "react";
import { Router } from "react-router";

export interface HistoryRouterProps {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
  /**
   * 在路由 hydration 期间显示的组件
   * 类似于 React Router 的 HydrateFallback
   */
  hydrateFallback?: React.ComponentType | React.ReactNode;
}

export default function HistoryRouter({
  basename,
  children,
  history,
  hydrateFallback,
}: HistoryRouterProps) {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  // 管理 hydration 状态
  const [isHydrating, setIsHydrating] = useState(true);

  // 监听路由变化
  useLayoutEffect(() => history.listen(setState), [history]);

  // 在组件挂载后完成 hydration
  useLayoutEffect(() => {
    // 使用 setTimeout 确保在下一个事件循环中完成 hydration
    // 这样可以确保所有子组件都已经准备好
    const timer = setTimeout(() => {
      setIsHydrating(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  // 如果正在 hydration 且提供了 fallback，则显示 fallback
  if (isHydrating && hydrateFallback) {
    const FallbackComponent =
      typeof hydrateFallback === "function" ? hydrateFallback : null;
    return FallbackComponent ? (
      <FallbackComponent />
    ) : (
      (hydrateFallback as React.ReactElement)
    );
  }

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
}
