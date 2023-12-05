import { API_URLS } from '../constants/api-urls';
import { http } from '../core/http';
import { AuthResult } from '../models/api/auth-result';
import { LoginDto } from '../models/dto/login.dto';

export const createAuthService = () => {
    const login = (dto: LoginDto): Promise<AuthResult> =>
        http()
            .post<AuthResult>(API_URLS.auth.login(), dto)
            .then((response) => response.data);

    const refresh = (): Promise<AuthResult> =>
        http()
            .post<AuthResult>(API_URLS.auth.refresh())
            .then((response) => response.data);

    return {
        login,
        refresh
    };
};
