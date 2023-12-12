import { API_URLS } from '../../constants/api-urls';
import { http } from '../../core/http';
import { AuthResult } from '../../models/api/auth-result';
import { LoginDto } from '../../models/dto/login.dto';
import { createAuthService } from './auth.service';

jest.mock('../../constants/api-base-url', () => ({
    getApiBaseUrl: jest.fn().mockReturnValue('http://baseurl.com')
}));

jest.mock('../../core/http');

describe('AuthService', () => {
    it('should call login API with the correct URL and data', async () => {
        const authService = createAuthService();

        const loginDto: LoginDto = {
            username: 'testUser'
        };

        const authResult: AuthResult = {
            user: {
                id: 'userId',
                username: 'testUser',
                fullName: 'Test User'
            },
            token: 'testAccessToken'
        };

        const mockPost = jest.fn().mockResolvedValueOnce({
            data: authResult
        });

        (http as any).mockReturnValueOnce({
            post: mockPost
        });

        const response = await authService.login(loginDto);

        expect(mockPost).toHaveBeenCalledWith(API_URLS.auth.login(), loginDto);

        expect(response).toEqual(authResult);
    });

    it('should call refresh API with the correct URL and data', async () => {
        const authService = createAuthService();

        const authResult: AuthResult = {
            user: {
                id: 'userId',
                username: 'testUser',
                fullName: 'Test User'
            },
            token: 'testAccessToken'
        };

        const mockPost = jest.fn().mockResolvedValueOnce({
            data: authResult
        });

        (http as any).mockReturnValueOnce({
            post: mockPost
        });

        const response = await authService.refresh();

        expect(mockPost).toHaveBeenCalledWith(API_URLS.auth.refresh());

        expect(response).toEqual(authResult);
    });
});
