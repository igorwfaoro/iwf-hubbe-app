import { API_URLS } from '../../constants/api-urls';
import { http } from '../../core/http';

export const createGithubService = () => {
    const getRepoReadme = (): Promise<string> =>
        http({ ignoreConfigs: true })
            .get(`${API_URLS.github.getContent('igorwfaoro', 'iwf-rooms', 'main', 'README.md')}`)
            .then((response) => response.data);

    return {
        getRepoReadme
    };
};
