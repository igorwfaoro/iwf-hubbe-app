import { Response } from 'express';
import { UserViewModel } from '../../models/view-models/user.view-model';

export interface TokenPayload {
    user: UserViewModel;
    pingToken: string;
}
export class TokenHelper {
    public static getPayload(res: Response): TokenPayload {
        return res.locals.jwtPayload;
    }
}
