// jest.config.ts
const {createCjsPreset} = require('jest-preset-angular/presets');

/** @type {import('jest').Config} */
module.exports = {
    ...createCjsPreset(),
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: [
        '<rootDir>/node_modules/',
        '<rootDir>/dist/',
        '<rootDir>/src/test.ts', // fichier Karma par défaut
    ],
};
