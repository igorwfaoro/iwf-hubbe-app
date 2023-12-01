'use client';

import { User } from '../models/api/user';

const STORAGE_KEY = 'app-data';

interface StorageData {
  user: User;
  token: string;
}

let DATA: Partial<StorageData> = {};

export const createStorageService = ({ load }: { load?: boolean } = {}) => {
  const loadData = (): Partial<StorageData> => {
    DATA = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    return DATA;
  };

  const getData = (): Partial<StorageData> => DATA;

  const setData = (
    value:
      | Partial<StorageData>
      | ((value: Partial<StorageData>) => Partial<StorageData>)
  ) => {
    if (typeof value === 'function') {
      const newData = value(DATA);
      setData(newData);
      return newData;
    } else {
      DATA = value;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(DATA));
    }
  };

  load && loadData();

  return {
    loadData,
    getData,
    setData
  };
};
