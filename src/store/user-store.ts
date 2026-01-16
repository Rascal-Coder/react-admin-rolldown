import { useMemo } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { StorageEnum } from "#/enum";
import type { UserInfo, UserToken } from "@/types/user";

const EMPTY_ROLES: UserInfo["roles"] = [];
const EMPTY_PERMISSIONS: UserInfo["permissions"] = [];

type UserStore = {
  userInfo: Partial<UserInfo>;
  userToken: UserToken;

  actions: {
    setUserInfo: (userInfo: UserInfo) => void;
    setUserToken: (token: UserToken) => void;
    clearUserInfoAndToken: () => void;
  };
};

const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      userInfo: {},
      userToken: {},
      actions: {
        setUserInfo: (userInfo) => {
          set({ userInfo });
        },
        setUserToken: (userToken) => {
          set({ userToken });
        },
        clearUserInfoAndToken() {
          set({ userInfo: {}, userToken: {} });
        },
      },
    }),
    {
      name: "userStore", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({
        [StorageEnum.UserInfo]: state.userInfo,
        [StorageEnum.UserToken]: state.userToken,
      }),
    }
  )
);

export const useUserInfo = () => useUserStore((state) => state.userInfo);
export const useUserToken = () => useUserStore((state) => state.userToken);
export const useUserActions = () => useUserStore((state) => state.actions);

/**
 * 获取用户权限列表
 */
export const useUserPermissions = () => {
  const permissions = useUserStore((state) => state.userInfo.permissions);
  return useMemo(() => permissions || EMPTY_PERMISSIONS, [permissions]);
};

/**
 * 获取用户角色列表
 * 使用 useMemo 确保返回稳定的引用，避免无限循环
 */
export const useUserRoles = () => {
  const roles = useUserStore((state) => state.userInfo.roles);
  return useMemo(() => roles || EMPTY_ROLES, [roles]);
};

export default useUserStore;
