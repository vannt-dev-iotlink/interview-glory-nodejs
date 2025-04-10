import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import { verifyAccessToken } from "../utils/jwt";

interface JwtPayload {
    id: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: "Missing or invalid Authorization header" });
        return
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = verifyAccessToken(token) as JwtPayload;
        req.userId = decoded.id;
        if (!UserService.isValidToken(decoded.id, token)) {
            res.status(401).json({ message: "Session expired" });
            return
        }
        next();
    } catch {
        res.status(401).json({ message: "Invalid or expired token" });
        return
    }
};

declare global {
    namespace Express {
        interface Request {
            userId?: any;
        }
    }
}