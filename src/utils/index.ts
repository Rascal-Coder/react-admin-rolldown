import { type ClassValue, clsx } from "clsx";
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
