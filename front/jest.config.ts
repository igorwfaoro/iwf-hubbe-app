import type { Config } from 'jest';

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.(tsx|ts)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;
