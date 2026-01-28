type UserProps = {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
};

type UserToken = API.TokenVO;

/** 用户性别 */
export enum UserSex {
  /** 女 */
  Female = 0,
  /** 男 */
  Male = 1,
}

/** 用户信息 - 直接使用 API.UserVO */
type UserInfo = API.UserVO;

export type { UserProps, UserToken, UserInfo };
