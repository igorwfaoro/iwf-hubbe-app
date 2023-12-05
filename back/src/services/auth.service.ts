import { TokenPayload } from '../util/helpers/token.helper';
import jwt from 'jsonwebtoken';
import { UserViewModel } from '../models/view-models/user.view-model';
import { ENV } from '../env';
import { prisma } from '../database/db';
import { LoginInputModel } from '../models/input-models/login.input-model';
import { AuthException } from '../util/exceptions/auth.exception';
import { AuthViewModel } from '../models/view-models/auth.view-model';
import { User } from '@prisma/client';

export const createAuthService = () => {
    const login = async (input: LoginInputModel) => {
        const { username } = input;

        const user = await prisma.user.findFirst({
            where: { username }
        });

        if (!user) throw new AuthException();

        return AuthViewModel.create(UserViewModel.fromModel(user), makeToken(user));
    };

    const refresh = async (userId: string) => {
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) throw new AuthException();

        return AuthViewModel.create(UserViewModel.fromModel(user), makeToken(user));
    };

    const makeToken = (user: User): string => {
        const payload: TokenPayload = { user };

        const token = jwt.sign(payload, ENV.JWT_SECRET, {
            expiresIn: '1y'
        });

        return token;
    };

    return {
        login,
        refresh
    };
};
