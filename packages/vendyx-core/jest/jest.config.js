/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('node:path');

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  rootDir: path.resolve(__dirname, '..'),
  moduleNameMapper: {
    '@/tests/(.*)': '<rootDir>/tests/$1',
    '@/(.*)': '<rootDir>/src/$1'
  },
  testMatch: ['<rootDir>/src/**/*.test.ts?(x)', '<rootDir>/tests/**/*.test.ts?(x)']
};
