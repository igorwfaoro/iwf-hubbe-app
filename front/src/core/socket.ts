import { io } from 'socket.io-client';
import { createStorage } from './storage';

const { VITE_APP_API_URL } = import.meta.env;

const storage = createStorage();

export const createSocket = () => io(VITE_APP_API_URL, {
    auth: {
        Authorization: `Bearer ${storage.getData().token}`
    }
});
