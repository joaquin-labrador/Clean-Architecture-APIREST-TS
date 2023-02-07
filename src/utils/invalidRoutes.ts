import { Request, Response } from "express";

export const invalidRoutes = (req: Request, res: Response) => {
    res.status(404).json({ message: "Invalid route" });
}