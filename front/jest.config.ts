import type { Config } from 'jest';

const config: Config = {
    coverageProvider: 'v8',
    testEnvironment: 'jsdom',
    testMatch: ['<rootDir>/src/**/*.test.(tsx|ts)'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!react-markdown)']
};

export default config;
