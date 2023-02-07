import jwt from 'jsonwebtoken';
import { UserPayload } from '../utils/customJwtPayload';

import { HttpErrorHandler } from '../error/HttpErrorHandler';

export const generateToken = (payload: UserPayload) => {
    try {
        return jwt.sign({
            userId: payload.userId,
            userCategory: payload.userCategory
        },
            process.env.SECRET_JWT as string,
            {
                expiresIn: 60 * 60 * 24 * 30
            });
    } catch (error) {
        console.log(error);
        throw new HttpErrorHandler(500, 'Error generating token');
    }
};