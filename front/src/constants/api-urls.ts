export const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

export const API_URLS = {
    auth: {
        login: () => `${API_BASE_URL}/v1/auth/login`
    },
    rooms: {
        getAll: () => `${API_BASE_URL}/v1/rooms`,
        getById: (id: string) => `${API_BASE_URL}/v1/rooms/${id}`,
        isInUse: (id: string) => `${API_BASE_URL}/v1/rooms/${id}/isInUse`
    }
};
