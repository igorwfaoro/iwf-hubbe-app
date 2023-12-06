import type { Config } from 'jest';

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};

export default config;
