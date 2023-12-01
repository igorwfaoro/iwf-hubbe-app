import { API_URLS } from '../constants/api-urls';
import { http } from '../core/http';
import { LoginResult } from '../models/api/login-result';
import { LoginDto } from '../models/dto/login.dto';

export const createAuthService = () => {
    const login = (dto: LoginDto): Promise<LoginResult> =>
        http()
            .post<LoginResult>(API_URLS.auth.login(), dto)
            .then((response) => response.data);

    return {
        login
    };
};
