import { setupWorker } from "msw/browser";
import { getMenuList } from "./handlers/_menu";
import { signIn, userList } from "./handlers/_user";

const handlers = [signIn, userList, getMenuList];
const worker = setupWorker(...handlers);

export { worker };
