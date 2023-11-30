import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { ENV_CONFIG } from '../env-config';
import { AuthException } from '../util/exceptions/auth.exception';

export function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = <string>req.headers['authorization'];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token.split(' ')[1], ENV_CONFIG.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        next(new AuthException());
    }

    next();
}
