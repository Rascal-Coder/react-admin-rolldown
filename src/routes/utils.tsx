const Pages = import.meta.glob("/src/pages/**/*.tsx");

/**
 * 根据路径创建 React Router 的 lazy 函数
 * @param path 组件路径，如 "/pages/dashboard/workbench"
 * @returns React Router lazy 函数（返回 Promise<{ Component }>）
 */
export const createLazyComponent = (
  path = ""
): (() => Promise<{ Component: React.ComponentType<any> }>) => {
  if (!path) {
    throw new Error("Component path is required");
  }

  let importFn = Pages[`/src${path}.tsx`];
  if (!importFn) {
    importFn = Pages[`/src${path}/index.tsx`];
  }
  if (!importFn) {
    throw new Error(`Component not found for path: ${path}`);
  }

  return async () => {
    const module = (await importFn()) as { default: React.ComponentType<any> };
    return { Component: module.default };
  };
};
