import { AuthMiddleware } from "../authMiddleware";
import { auth } from "../verifyToken";

export const allMiddlewares = [
    AuthMiddleware,
    auth,
]