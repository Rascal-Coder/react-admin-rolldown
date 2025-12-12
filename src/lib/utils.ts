/**
 * 安全地从 localStorage 获取数据
 */
export function getLocalStorageItem<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : null;
  } catch (error) {
    console.warn(`Failed to get item from localStorage (key: ${key}):`, error);
    return null;
  }
}

/**
 * 安全地获取 localStorage 中的字符串值
 */
export function getLocalStorageString(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.warn(
      `Failed to get string from localStorage (key: ${key}):`,
      error
    );
    return null;
  }
}

/**
 * 安全地向 localStorage 存储数据
 */
export function setLocalStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Failed to set item to localStorage (key: ${key}):`, error);
  }
}

/**
 * 安全地向 localStorage 存储字符串
 */
export function setLocalStorageString(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn(`Failed to set string to localStorage (key: ${key}):`, error);
  }
}
