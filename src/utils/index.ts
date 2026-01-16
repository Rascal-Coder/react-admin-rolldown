import { type ClassValue, clsx } from "clsx";
import { createDefu } from "defu";
import { twMerge } from "tailwind-merge";
/**
 * merge classnames
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initCopyRight = () => {
  const charAt = `
$$$$$$$                      
$$  __$$                     
$$ |  $$ |$$   $$  $$$$$$  
$$$$$$$ |$$ |  $$ |$$  __$$ 
$$  __$$ $$ |  $$ |$$ /  $$ |
$$ |  $$ |$$ |  $$ |$$ |  $$ |
$$$$$$$  |$$$$$$  |$$$$$$$ |
_______/  ______/  ____$$ |
                    $$   $$ |
                    $$$$$$  |
                     ______/                                                               
  `;
  console.info(`%c${charAt}`, "color: #5BE49B");
};

export function sleep(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * join url parts
 * @example
 * urlJoin('/admin/', '/api/', '/user/') // '/admin/api/user'
 * urlJoin('/admin', 'api', 'user/')     // '/admin/api/user'
 * urlJoin('/admin/', '', '/user/')      // '/admin/user'
 */
export const urlJoin = (...parts: string[]) => {
  const result = parts
    .map((part) => {
      return part.replace(/^\/+|\/+$/g, ""); // 去除两边/
    })
    .filter(Boolean);
  return `/${result.join("/")}`;
};

/**
 * bind methods to instance
 * @param instance 实例
 * @returns void
 * @example
 * bindMethods(new class {
 *   method() {
 *     console.log("method");
 *   }
 * })
 */
export function bindMethods<T extends object>(instance: T): void {
  const prototype = Object.getPrototypeOf(instance);
  const propertyNames = Object.getOwnPropertyNames(prototype);

  for (const propertyName of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
    const propertyValue = instance[propertyName as keyof T];

    if (
      typeof propertyValue === "function" &&
      propertyName !== "constructor" &&
      descriptor &&
      !descriptor.get &&
      !descriptor.set
    ) {
      instance[propertyName as keyof T] = propertyValue.bind(instance);
    }
  }
}

/**
 * check if value is string
 * @param value 值
 * @returns 是否是字符串
 * @example
 * isString("123") // true
 * isString(123) // false
 */
export const isString = (val: unknown): val is string =>
  typeof val === "string";

export const mergeWithArrayOverride = createDefu((originObj, key, updates) => {
  if (Array.isArray(originObj[key]) && Array.isArray(updates)) {
    originObj[key] = updates;
    return true;
  }
});
