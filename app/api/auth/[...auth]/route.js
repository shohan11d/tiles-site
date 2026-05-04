import { auth } from "../../../lib/auth"; // relative path to app/lib/auth.js
import { toNextJsHandler } from "better-auth/next-js";

export const { POST, GET } = toNextJsHandler(auth);