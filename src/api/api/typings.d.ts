declare namespace API {
  type CaptchaVO = {
    /** 验证码id */
    id?: string;
    /** 验证码图片 */
    imageBase64?: string;
  };

  type fileFilecontrollerGetfileParams = {
    fileName: string;
    bucket: string;
  };

  type FileVO = {
    /** 主键ID */
    id?: string;
    /** 文件名 */
    fileName?: string;
    /** 文件路径 */
    filePath?: string;
    /** 外键名称 */
    pkName?: string;
    /** 外键值 */
    pkValue?: string;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
  };

  type LoginDTO = {
    /** 登录账号 */
    accountNumber?: string;
    /** 登录密码 */
    password?: string;
    /** 验证码key */
    captchaId?: string;
    /** 验证码 */
    captcha?: string;
  };

  type PublicKeyVO = {
    /** 公钥 */
    publicKey?: string;
  };

  type RefreshTokenDTO = {
    /** 刷新token */
    refreshToken?: string;
  };

  type ResetPasswordDTO = {
    /** 密码 */
    password?: string;
    /** 邮箱 */
    email?: string;
    /** 邮箱验证码 */
    emailCaptcha?: string;
  };

  type TokenVO = {
    /** accessToken的过期时间 */
    expire?: number;
    /** accessToken */
    accessToken?: string;
    /** refreshToken的过期时间 */
    refreshExpire?: number;
    /** refreshToken */
    refreshToken?: string;
  };

  type UserDTO = {
    id?: string;
    /** 用户名称 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 邮箱 */
    email?: string;
    /** 头像 */
    avatar?: string;
    /** 性别（0:女，1:男） */
    sex?: number;
    /** 邮箱验证码 */
    emailCaptcha?: string;
  };

  type userUsercontrollerGetbyidParams = {
    id: string;
  };

  type userUsercontrollerPageParams = {
    phoneNumber?: string;
    nickName?: string;
    size?: number;
    page?: number;
  };

  type userUsercontrollerRemoveParams = {
    id: number;
  };

  type UserVO = {
    /** 主键ID */
    id?: string;
    /** 用户名称 */
    userName?: string;
    /** 用户昵称 */
    nickName?: string;
    /** 手机号 */
    phoneNumber?: string;
    /** 邮箱 */
    email?: string;
    /** 性别（0:女，1:男） */
    sex?: number;
    /** 头像文件信息 */
    avatarEntity?: FileVO;
    /** 创建时间 */
    createDate?: string;
    /** 更新时间 */
    updateDate?: string;
  };
}
