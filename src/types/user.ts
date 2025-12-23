import type { Permission, Role } from "@/_mock/assets";
import type { BasicStatus } from "./enum";

type UserProps = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

interface UserToken {
  accessToken?: string;
  refreshToken?: string;
}
interface UserInfo {
  id: string;
  email: string;
  username: string;
  password?: string;
  avatar?: string;
  status?: BasicStatus;
  roles?: Role[];
  permissions?: Permission[];
}
export type { UserProps, UserToken, UserInfo };
