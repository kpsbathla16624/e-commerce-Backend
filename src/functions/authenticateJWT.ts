import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.SecretKey || ''; // Secret key for JWT 

export const authenticateJWT = (req: any, res: any, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

    if (!token) {
        return res.sendStatus(403); // Forbidden if no token is provided
    }

    jwt.verify(token, SECRET_KEY, (err:any, user:any) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user; // Save the user info to the request
        next(); // Proceed to the next middleware or route handler
    });
};
