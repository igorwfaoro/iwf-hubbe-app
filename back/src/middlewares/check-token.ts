import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../env';
import { AuthException } from '../util/exceptions/auth.exception';

export function checkToken(req: Request, res: Response, next: NextFunction) {
    const token = <string>req.headers['authorization'];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token.split(' ')[1], ENV.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch (error) {
        console.error(error);
        next(new AuthException());
    }

    next();
}
