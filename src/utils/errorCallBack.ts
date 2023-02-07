import { NextFunction, Response, Request } from "express";
import { HttpErrorHandler } from "../error/HttpErrorHandler";

export const errorCallBack = (err: HttpErrorHandler, req: Request, res: Response, next: NextFunction) => {

    res.status(err.status).json({ errorMessage: err.message });
};