import axios, { AxiosError } from 'axios';
import { createStorage } from './storage';

const storage = createStorage();

export const http = () => {
    const { token } = storage.getData();

    const instance = axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
        }
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status === 401) {
                return (window.location.href = '/login');
            }
            return Promise.reject(error);
        }
    );

    return instance;
};

export const mapHttpError = (error: AxiosError) => {
    return (error.response?.data as any).message || 'Unknown Error';
};
