import { lazy } from "react";

const Pages = import.meta.glob("/src/pages/**/*.tsx");
const lazyComponentCache = new Map<string, React.LazyExoticComponent<any>>();

export const Component = (path = "", props?: any): React.ReactNode => {
  if (!path) {
    return null;
  }

  let importFn = Pages[`/src${path}.tsx`];
  if (!importFn) {
    importFn = Pages[`/src${path}/index.tsx`];
  }
  if (!importFn) {
    console.warn("Component not found for path:", path);
    return null;
  }

  let Element = lazyComponentCache.get(path);
  if (!Element) {
    Element = lazy(importFn as any);
    lazyComponentCache.set(path, Element);
  }
  return <Element {...props} />;
};

export const LayoutBase = lazy(() => import("@/layouts/base"));
export const LayoutSimple = lazy(() => import("@/layouts/simple"));
