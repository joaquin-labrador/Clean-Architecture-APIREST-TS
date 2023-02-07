import { PrismaClientKnownRequestError } from "@prisma/client/runtime";


import { HttpErrorHandler } from "../../error/HttpErrorHandler";

export const handleRepositoryError = (error: any) => {
    if (error instanceof PrismaClientKnownRequestError) {
        return new HttpErrorHandler(400, error.message);
    }
    else if (error instanceof HttpErrorHandler) return error;
    else return new HttpErrorHandler(500, "Internal server error");
}