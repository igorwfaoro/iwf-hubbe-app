import axios, { AxiosError } from 'axios';
import { createStorage } from './storage';

const storage = createStorage();

const { token } = storage.getData();

export const makeAuth = (username: string, password: string) => {
    return `Basic ${btoa(`${username}:${password}`)}`;
};

export const http = () =>
    axios.create({
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : ''
        }
    });

export const mapHttpError = (error: AxiosError) => {
    return (error.response?.data as any).message || 'Unknown Error';
};
