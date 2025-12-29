import type { RouteObject } from "react-router";
import { create } from "zustand";
import type { RouteConfig } from "@/lib/router-toolset/types";

export type RouterStore = {
  routes: RouteConfig[];
  reactRoutes: RouteObject[];
  flattenRoutes: Map<string, RouteConfig>;
  basename: string;
  actions: {
    setRouterState: (
      routes: RouteConfig[],
      reactRoutes: RouteObject[],
      flattenRoutes: Map<string, RouteConfig>
    ) => void;
    setBasename: (basename: string) => void;
    reset: () => void;
  };
};

const initialState = {
  routes: [] as RouteConfig[],
  reactRoutes: [] as RouteObject[],
  flattenRoutes: new Map<string, RouteConfig>(),
  basename: "/",
};

export const useRouterStore = create<RouterStore>()((set) => ({
  ...initialState,
  actions: {
    setRouterState: (routes, reactRoutes, flattenRoutes) =>
      set({ routes, reactRoutes, flattenRoutes }),
    setBasename: (basename) => set({ basename }),
    reset: () => set(initialState),
  },
}));

export default useRouterStore;

export const useRoutes = () => useRouterStore((state) => state.routes);
export const useReactRoutes = () =>
  useRouterStore((state) => state.reactRoutes);
export const useFlattenRoutes = () =>
  useRouterStore((state) => state.flattenRoutes);
export const useBasename = () => useRouterStore((state) => state.basename);
export const useRouterActions = () => useRouterStore((state) => state.actions);
