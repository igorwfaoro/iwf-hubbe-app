import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { ENV } from '../env';
import { AuthException } from '../util/exceptions/auth.exception';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { TokenPayload } from '../util/helpers/token.helper';

const checkToken = (token: string): TokenPayload => {
    try {
        return <any>jwt.verify(token.split(' ')[1], ENV.JWT_SECRET);
    } catch (error) {
        throw new AuthException();
    }
};

export const checkHttpToken = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['authorization'];

    try {
        res.locals.jwtPayload = checkToken(token);
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
};

export const checkSocketToken = (
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    const token = socket.handshake.auth.Authorization;
    return checkToken(token);
};
