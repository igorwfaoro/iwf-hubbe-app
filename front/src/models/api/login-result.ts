import { User } from './user';

export interface LoginResult {
    user: User;
    token: string;
}
