import { ENV_CONFIG } from '../env-config';
import { TokenPayload } from '../util/helpers/token.helper';
import jwt from 'jsonwebtoken';
import { UserViewModel } from '../models/view-models/user.view-model';

export const createAuthService = () => {
    const login = () => {};

    const makeToken = (user: UserViewModel, expiration: number, pingToken: any): string => {
        const payload: TokenPayload = { user, pingToken };

        const token = jwt.sign(payload, ENV_CONFIG.JWT_SECRET, {
            expiresIn: expiration
        });

        return token;
    };

    return {
        login
    };
};
