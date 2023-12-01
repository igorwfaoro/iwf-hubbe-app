import { API_URLS } from '../constants/api-urls';
import { httpRequest } from '../http/request';
import { LoginResult } from '../models/api/login-result';
import { User } from '../models/api/user';
import { LoginDto } from '../models/dto/login.dto';
import { createStorageService } from './storage.service';

const storage = createStorageService({ load: true });

export const createAuthService = () => {
  const login = (dto: LoginDto): Promise<User> =>
    httpRequest()
      .post<LoginResult>(API_URLS.auth.login(), dto)
      .then((response) => {
        storage.setData((currentData) => ({
          ...currentData,
          ...response.data
        }));
        return response.data.user;
      });

  const getLoggedUser = () => storage.getData().user;

  return {
    login,
    getLoggedUser
  };
};
