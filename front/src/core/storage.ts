import { User } from '../models/api/user';

export interface AppDataStorage {
    user: User;
    token: string;
}

const STORAGE_KEY = 'app-data';
let data: Partial<AppDataStorage> = {};

export const createStorage = () => {
    const init = (): void => {
        loadData();
    };

    const loadData = (): void => {
        data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    };

    const getData = (): Partial<AppDataStorage> => data;

    const setData = (newData: Partial<AppDataStorage>): void => {
        data = newData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    };

    const clearData = (): void => {
        setData({});
    };

    return {
        init,
        loadData,
        clearData,
        getData,
        setData
    };
};

createStorage().init();
