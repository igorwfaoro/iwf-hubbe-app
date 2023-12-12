import { API_URLS } from '../../constants/api-urls';
import { http } from '../../core/http';
import { Room } from '../../models/api/room';
import { createGithubService } from './github.service';

jest.mock('../../constants/api-base-url', () => ({
    getApiBaseUrl: jest.fn().mockReturnValue('http://baseurl.com')
}));

jest.mock('../../core/http');

describe('GithubService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should call getRepoReadme API with the correct URL', async () => {
        const githubService = createGithubService();

        const readmeData = 'This is a Readme'

        const mockGet = jest.fn().mockResolvedValueOnce({
            data: readmeData
        });

        (http as any).mockReturnValueOnce({
            get: mockGet
        });

        const response = await githubService.getRepoReadme();

        expect(mockGet).toHaveBeenCalledWith(API_URLS.github.getContent('igorwfaoro', 'iwf-rooms', 'main', 'README.md'));
        expect(response).toEqual(readmeData);
    });
});
