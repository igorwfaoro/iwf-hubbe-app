import { Request, Response } from 'express';
import { TokenPayload } from '../../util/helpers/token/token.helper';
import { checkHttpToken, checkSocketToken } from './check-token';
import { AuthException } from '../../util/exceptions/auth.exception';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Handshake } from 'socket.io/dist/socket';

const jwt = require('jsonwebtoken');

const mockJwtSecret = '1d940593-eafc-4bef-bae7-3f853ecbf8b4';

const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZjUyOTc4MmU4ZWNmMzFiYTgxOGI5IiwidXNlcm5hbWUiOiJzcG9uZ2Vib2IiLCJmdWxsTmFtZSI6IlNwb25nZUJvYiBTcXVhcmVQYW50cyJ9LCJpYXQiOjE3MDIzMjUwMDAsImV4cCI6NDg1ODA4NTAwMH0.HTxvkpD4OncNQEOaOIY9M0xilUZHmrxzkGIJNmCEnKw';

const mockTokenPayload: TokenPayload = {
    user: {
        id: '656f529782e8ecf31ba818b9',
        username: 'testUser',
        fullName: 'Test User'
    }
};

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn().mockReturnValue({
        user: {
            id: '656f529782e8ecf31ba818b9',
            username: 'testUser',
            fullName: 'Test User'
        }
    })
}));

jest.mock('../../env', () => ({
    ENV: {
        JWT_SECRET: '1d940593-eafc-4bef-bae7-3f853ecbf8b4'
    }
}));

describe('HTTP Authentication Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add the token payload to locals and call the next function', () => {
        const next = jest.fn();

        const mockRequest: Partial<Request> = {
            headers: {
                authorization: `Bearer ${mockToken}`
            }
        };

        const mockResponse: Partial<Response> = {
            locals: {
                jwtPayload: undefined
            }
        };

        checkHttpToken(mockRequest as Request, mockResponse as Response, next);

        expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockJwtSecret);
        expect(mockResponse.locals!.jwtPayload).toEqual(mockTokenPayload);
        expect(next).toHaveBeenCalled();
    });

    it('should call the next function with an error for an invalid token', () => {
        const next = jest.fn();

        const mockRequest: Partial<Request> = {
            headers: {
                authorization: 'Bearer invalid-token'
            }
        };

        const mockResponse: Partial<Response> = {
            locals: {
                jwtPayload: undefined
            }
        };

        jwt.verify.mockImplementationOnce(() => {
            throw new Error('Invalid token');
        });

        checkHttpToken(mockRequest as Request, mockResponse as Response, next);

        expect(next).toHaveBeenCalledWith(expect.any(AuthException));
        expect(mockResponse.locals.jwtPayload).toBeUndefined();
    });
});

describe('WebSocket Authentication Middleware', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should verify and return the token payload', () => {
        const socket: Partial<Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>> = {
            handshake: {
                auth: {
                    Authorization: `Bearer ${mockToken}`
                }
            } as Partial<Handshake> as Handshake
        };
    
        const payload = checkSocketToken(
            socket as Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
        );
    
        expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockJwtSecret);
        expect(payload).toEqual(mockTokenPayload);
    });
});
