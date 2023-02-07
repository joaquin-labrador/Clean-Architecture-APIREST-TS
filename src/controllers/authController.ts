import { Service } from "typedi";
import { Response, Request, NextFunction } from "express";

import { UserAuthService } from "../service/userAuth"
import { UserSaveDTO } from "../dto/userSaveDTO";
import { saveTokenInCookie } from "../utils/tokenCookie";
import { UserPayload } from "../utils/customJwtPayload";
import { UserCategoryId } from "../enum/userCategories";

@Service({ transient: true })
export class UserAuthController {

    public userAuthService: UserAuthService;

    constructor(userAuthService: UserAuthService) {
        console.log("User auth controller created");
        this.userAuthService = userAuthService;

    }

    public sayHello(req: Request, res: Response) {
        const { userId, userCategory } = req.user as UserPayload;
        res.status(200).json({ message: `Hello from user auth controller, user id: ${userId}, user category: ${userCategory}` });
    }


    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password, email, firstName, lastName, address } = req.body;
            const INITIAL_BALANCE = 0;
            const userSaveDTO = new UserSaveDTO(username, password, email, firstName,
                lastName, INITIAL_BALANCE, address, UserCategoryId.BASIC);


            const isSaved = await this.userAuthService.registerUser(userSaveDTO);
            if (!isSaved) res.status(400).json({ message: "Error creating user" });

            res.status(201).json({ message: "User created sucefully, checkout your email box" });

        } catch (error) {
            next(error)
        }

    }


    async loginUser(req: Request, res: Response, next: NextFunction) {

        try {
            const { username, email, password } = req.body;

            if (!username && !email) res.status(400).json({ message: "Username or Email required" });

            let token: string | null = null;

            if (username) {
                token = await this.userAuthService.authenticateUserByUsername(username, password);
            } else if (email) {
                token = await this.userAuthService.authenticateUserByEmail(email, password);
            }

            if (!token) res.status(400).json({ message: "Invalid credentials" });

            else saveTokenInCookie(res, token);

            res.status(200).json({ token });

        } catch (error) {
            next(error)
        }

    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("token");
            res.status(200).json({ message: "User logged out successfully" });
        } catch (error) {
            next(error);
        }
    };

    async verifedUser(req: Request, res: Response, next: NextFunction) {

        try {
            const { userId } = req.params;
            await this.userAuthService.validateUser(userId);
            res.status(200).json({ message: "User verified successfully" });
        }
        catch (error) {
            next(error);
        }
    }

    async forgotPassword(req: Request, res: Response, next: NextFunction) {

        try {
            const { email } = req.body;
            const isSended = await this.userAuthService.sendCodePasswordReset(email);

            if (!isSended) res.status(400).json({ message: "Error sending email" });
            else res.status(200).json({ message: "Email sended successfully" });

        } catch (error) {
            next(error);
        }

    }

    async resetPassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { code, password, email } = req.body;
            const isReset = await this.userAuthService.resetPassword(code, password, email);

            if (!isReset) res.status(400).json({ message: "Invalid credentials" });

            else res.status(200).json({ message: "Password reset successfully" });
        } catch (error) {
            next(error);
        }
    }

    async userCategoryUpdate(req: Request, res: Response, next: NextFunction) {
        try {
            const { userId } = req.params;

        } catch (error) {
            next(error);
        }
    }
}
