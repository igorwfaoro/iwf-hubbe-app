import { Request, Response } from 'express';
import { TokenPayload } from '../../util/helpers/token/token.helper';
import { checkHttpToken, checkSocketToken } from './check-token';
import { AuthException } from '../../util/exceptions/auth.exception';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Handshake } from 'socket.io/dist/socket';

const jwt = require('jsonwebtoken');

const mockJwtSecret = '2cbc8940-8316-55d2-b82b-499e6bc406d9>';

const mockToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU2ZjUyOTc4MmU4ZWNmMzFiYTgxOGI5IiwidXNlcm5hbWUiOiJzcG9uZ2Vib2IiLCJmdWxsTmFtZSI6IlNwb25nZUJvYiBTcXVhcmVQYW50cyJ9LCJpYXQiOjE3MDE4ODUzOTcsImV4cCI6MTczMzQ0Mjk5N30.J-FEQw4kAK33FkJrpi65SjQdvaEpevCeYwkhyV40Bg0';

const mockTokenPayload: TokenPayload = {
    user: {
        id: '656f529782e8ecf31ba818b9',
        username: 'testUser',
        fullName: 'Test User'
    }
};

jest.mock('jsonwebtoken', () => ({
    verify: jest.fn()
}));

jest.mock('../../env', () => ({
    ENV: {
        JWT_SECRET: '2cbc8940-8316-55d2-b82b-499e6bc406d9>'
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
                jwtPayload: {}
            }
        };

        checkHttpToken(mockRequest as Request, mockResponse as Response, next);

        expect(jwt.verify).toHaveBeenCalledWith(mockToken, mockJwtSecret);

        // TODO: test
        // expect(mockResponse.locals!.jwtPayload).toEqual(mockTokenPayload);

        expect(next).toHaveBeenCalled();
    });

    // it('should call the next function with an error for an invalid token', () => {
    //     const next = jest.fn();

    //     const mockRequest: Partial<Request> = {
    //         headers: {
    //             authorization: 'Bearer invalid-token'
    //         }
    //     };

    //     const mockResponse: Partial<Response> = {
    //         locals: {
    //             jwtPayload: {}
    //         }
    //     };

    //     jwt.verify.mockImplementation(() => {
    //         throw new Error('Invalid token');
    //     });

    //     checkHttpToken(mockRequest as Request, mockResponse as Response, next);

    //     expect(next).toHaveBeenCalledWith(new AuthException());
    // });
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

        // TODO: test
        // expect(payload).toEqual(mockTokenPayload);
    });
});
