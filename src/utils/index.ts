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
