import { User } from './user';

export interface AuthResult {
    user: User;
    token: string;
}
