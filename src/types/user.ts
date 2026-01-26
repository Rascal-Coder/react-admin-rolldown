import type { Permission, Role } from "@/_mock/assets";

type UserProps = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

interface UserToken {
  expire?: number;
  refreshExpire?: number;
  accessToken?: string;
  refreshToken?: string;
}

/** 用户性别 */
export enum UserSex {
  /** 女 */
  Female = 0,
  /** 男 */
  Male = 1,
}

/** 文件实体 */
interface FileEntity {
  id: string;
  fileName: string;
  filePath: string;
  pkName?: string;
  pkValue?: string;
}

interface UserInfo {
  id: string;
  /** 用户名称 */
  userName: string;
  /** 用户昵称 */
  nickName: string;
  /** 手机号 */
  phoneNumber: string;
  /** 邮箱 */
  email: string;
  /** 性别（0:女，1:男） */
  sex?: UserSex;
  /** 头像实体（Entity 格式） */
  avatarEntity?: FileEntity;
  /** 角色列表 */
  roles?: Role[];
  /** 权限列表 */
  permissions?: Permission[];
}
export type { UserProps, UserToken, UserInfo };
