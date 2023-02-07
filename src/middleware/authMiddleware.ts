import { Request, Response, NextFunction } from "express";


import { HttpErrorHandler } from "../error/HttpErrorHandler";
export abstract class AuthMiddleware {
    //abstract class because it is not meant to be instantiated 

    static verifyEmail(req: Request, res: Response, next: NextFunction) {
        const { email, username } = req.body;
        if (username) return next(); // if username is provided, skip email verification
        if (!email) throw new HttpErrorHandler(400, "Username or Email is required")
        if (!email.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)) throw new HttpErrorHandler(400, "Invalid email");
        return next();
    }


    /*
    (?=.*[a-z]) - at least one lowercase letter
    (?=.*[A-Z]) - at least one uppercase letter
    (?=.*[0-9]) - at least one number
    (?=.*[^A-Za-z0-9]) - at least one special character
    (?=.{8,}) - at least 8 characters 
    */

    static verifyPasswordAndEmail(req: Request, res: Response, next: NextFunction) {
        const { password, rePassword, email } = req.body;

        if (!password) throw new HttpErrorHandler(400, "Password is required")
        if (!email) throw new HttpErrorHandler(400, "Email is required")
        if (password !== rePassword) throw new HttpErrorHandler(400, "Passwords must match")
        if (!password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/))
            throw new HttpErrorHandler(400, "Not a secure password");
        if (!email.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/)) throw new HttpErrorHandler(400, "Invalid email");
        return next();
    }



}