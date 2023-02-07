import { Response } from "express";

export const saveTokenInCookie = (res: Response, token: string) => {
    res.cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        httpOnly: true,
        secure: false,
    });
};