import { HttpErrorHandler } from "../error/HttpErrorHandler";
import { User } from "../models/user";

export const isUserVerified = (user: User): void => {
    if (!user.getVerified())
        throw new HttpErrorHandler(401, "User not verified, please checkout your email");

}