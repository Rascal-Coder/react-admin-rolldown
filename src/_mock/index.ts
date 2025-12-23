import { setupWorker } from "msw/browser";
import { signIn, userList } from "./handlers/_user";

const handlers = [signIn, userList];
const worker = setupWorker(...handlers);

export { worker };
