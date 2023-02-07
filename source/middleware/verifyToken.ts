import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from "express";

import { UserPayload } from '../utils/customJwtPayload';
import { HttpErrorHandler } from "../error/HttpErrorHandler";



export const auth = (req: Request, res: Response, next: NextFunction) => {

    const { token } = req.cookies;
    if (!token) throw new HttpErrorHandler(401, "Unauthorized");

    try {
        const decoded = jwt.verify(token, process.env.SECRET_JWT!) as UserPayload;

        if (!decoded) throw new HttpErrorHandler(401, "Unauthorized");

        req.user = decoded;
        next();

    } catch (error) {
        handleJwtError(error)
    }


}

const handleJwtError = (error: any) => {
    if (error instanceof jwt.JsonWebTokenError ||
        error instanceof jwt.NotBeforeError ||
        error instanceof jwt.TokenExpiredError) {
        return new HttpErrorHandler(401, "Unauthorized");
    } else {
        return new HttpErrorHandler(500, "Internal Server Error");
    }
}

/**
 * THE AS ASSERTION IS USED TO TELL DE COMPILER THAT THE VARIABLE IS OF THE TYPE WE WANT
 */