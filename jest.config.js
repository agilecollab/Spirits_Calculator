// jest.config.js
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  //testEnvironment: "node",
  transform: {
    "^.+.tsx?$": ["ts-jest",{
        tsconfig: 'tsconfig.json',
        useESM: true,
    }],
  },

  testEnvironment: 'jsdom',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),

};
