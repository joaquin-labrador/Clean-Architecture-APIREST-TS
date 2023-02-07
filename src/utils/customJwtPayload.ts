import { JwtPayload } from "jsonwebtoken";

export interface UserPayload extends JwtPayload {
    userId: string;
    userCategory: string;
}