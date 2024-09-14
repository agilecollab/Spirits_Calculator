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
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
};
