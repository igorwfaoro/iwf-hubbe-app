import jwt from 'jsonwebtoken';
import { prisma } from '../../database/db';
import { createAuthService } from './auth.service';
import { AuthViewModel } from '../../models/view-models/auth.view-model';
import { AuthException } from '../../util/exceptions/auth.exception';
import { User } from '@prisma/client';
import { LoginInputModel } from '../../models/input-models/login.input-model';
import { UserViewModel } from '../../models/view-models/user.view-model';
import { TokenPayload } from '../../util/helpers/token/token.helper';
import { ENV } from '../../env';

const mockUser: User = {
    id: '656f529782e8ecf31ba818b9',
    username: 'testUser',
    fullName: 'Test User'
};

const invalidUsername = '000000';

const mockToken = 'mocked_token';

jest.mock('jsonwebtoken', () => ({
    sign: jest.fn(() => mockToken)
}));

describe('createAuthService', () => {
    const authService = createAuthService();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('login should return AuthViewModel with token for a valid username', async () => {
        const input: LoginInputModel = {
            username: mockUser.username
        };

        jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(mockUser);

        const result = await authService.login(input);

        const payload: TokenPayload = { user: UserViewModel.fromModel(mockUser) };

        expect(jwt.sign).toHaveBeenCalledWith(payload, ENV.JWT_SECRET, {
            expiresIn: '1y'
        });
        expect(result).toEqual(AuthViewModel.create(UserViewModel.fromModel(mockUser), mockToken));
    });

    it('login should throw AuthException for an invalid username', async () => {
        const input: LoginInputModel = {
            username: invalidUsername
        };

        jest.spyOn(prisma.user, 'findFirst').mockResolvedValue(null);

        await expect(async () => {
            await authService.login(input);
        }).rejects.toThrowError(AuthException);
    });

    it('refresh should return AuthViewModel with token for a valid userId', async () => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);

        const result = await authService.refresh(mockUser.id);

        const payload: TokenPayload = { user: UserViewModel.fromModel(mockUser) };

        expect(jwt.sign).toHaveBeenCalledWith(payload, ENV.JWT_SECRET, {
            expiresIn: '1y'
        });
        expect(result).toEqual(AuthViewModel.create(UserViewModel.fromModel(mockUser), mockToken));
    });

    it('refresh should throw AuthException for an invalid userId', async () => {
        jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);

        await expect(async () => {
            await authService.refresh(invalidUsername);
        }).rejects.toThrowError(AuthException);
    });
});
