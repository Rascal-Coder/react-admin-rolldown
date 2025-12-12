export enum BasicStatus {
  DISABLE = 0,
  ENABLE = 1,
}

export enum ResultStatus {
  SUCCESS = 0,
  ERROR = -1,
  TIMEOUT = 401,
}

export enum StorageEnum {
  UserInfo = "userInfo",
  UserToken = "userToken",
  Settings = "appSettings",
  I18N = "i18nextLng",
  Tabs = "layout-tabs",
}

export enum ThemeMode {
  Light = "light",
  Dark = "dark",
  System = "system",
}

export enum ThemeLayout {
  Vertical = "vertical",
  Horizontal = "horizontal",
}

export enum ThemeColorPresets {
  Red = "red",
  Orange = "orange",
  Amber = "amber",
  Yellow = "yellow",
  Lime = "lime",
  Green = "green",
  Emerald = "emerald",
  Teal = "teal",
  Cyan = "cyan",
  Sky = "sky",
  Blue = "blue",
  Indigo = "indigo",
  Violet = "violet",
  Purple = "purple",
  Fuchsia = "fuchsia",
  Pink = "pink",
  Rose = "rose",
}

export enum LocalEnum {
  en_US = "en_US",
  zh_CN = "zh_CN",
}

export enum MultiTabOperation {
  FULLSCREEN = "fullscreen",
  REFRESH = "refresh",
  CLOSE = "close",
  CLOSEOTHERS = "closeOthers",
  CLOSEALL = "closeAll",
  CLOSELEFT = "closeLeft",
  CLOSERIGHT = "closeRight",
}

export enum PermissionType {
  GROUP = 0,
  CATALOGUE = 1,
  MENU = 2,
  COMPONENT = 3,
}

export enum HtmlDataAttribute {
  ColorPalette = "data-color-palette",
  ThemeMode = "data-theme-mode",
}

export enum Direction {
  LTR = "ltr",
  RTL = "rtl",
}

export enum TabType {
  Chrome = "chrome",
  Vscode = "vscode",
  Card = "card",
}
