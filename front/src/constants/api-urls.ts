export const API_BASE_URL = 'http://127.0.0.1:3333'//process.env.API_URL;

export const API_URLS = {
  auth: {
    login: () => `${API_BASE_URL}/v1/auth/login`,
  }
};
