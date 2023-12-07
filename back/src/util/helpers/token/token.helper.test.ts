import { Response } from 'express';
import { TokenHelper, TokenPayload } from './token.helper';

describe('TokenHelper', () => {
    describe('getPayload', () => {
        it('should return the token payload from Response locals', () => {
            const jwtPayload: TokenPayload = {
                user: {
                    id: '123',
                    username: 'testuser',
                    fullName: 'Test User'
                }
            };

            const res: Partial<Response> = {
                locals: {
                    jwtPayload
                }
            };

            const payload = TokenHelper.getPayload(res as Response);
            expect(payload).toEqual(jwtPayload);
        });
    });
});
