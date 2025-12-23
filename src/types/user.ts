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
}
export type { UserProps, UserToken, UserInfo };
