import { Router } from "express";
import { Container } from "typedi";

import { UserAuthController } from "../controllers/authController";
import { AuthMiddleware } from "../middleware/authMiddleware";
import { auth } from "../middleware/verifyToken";


const router = Router();

const userAuthController = Container.get(UserAuthController);

//dont lose the context of userAuthController

router.get("/hello", auth, userAuthController.sayHello.bind(userAuthController));
router.get("/logout", userAuthController.logout.bind(userAuthController));
router.get("/verify/:userId", userAuthController.verifedUser.bind(userAuthController));

router.post("/register", AuthMiddleware.verifyPasswordAndEmail, userAuthController.createUser.bind(userAuthController));
router.post("/login", AuthMiddleware.verifyEmail, userAuthController.loginUser.bind(userAuthController));
router.post("/forgot-password", AuthMiddleware.verifyEmail, userAuthController.forgotPassword.bind(userAuthController));
router.post("/reset-password", AuthMiddleware.verifyPasswordAndEmail, userAuthController.resetPassword.bind(userAuthController));
/*
with bind() we are binding the context of userAuthController to the function, 
because if we don't use that, for example, userAuthService in
the authController will be undefined
*/
export { router as userAuthRouter };

