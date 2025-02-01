/* eslint-env node */

module.exports = {
   preset: 'ts-jest',
   clearMocks: true,
   restoreMocks: true,
   collectCoverage: true,
   collectCoverageFrom: ['src/**/*.{js,ts}', '!src/index.ts'],
   coverageDirectory: 'coverage',
   coverageReporters: ['text-summary', 'lcov'],
   coverageThreshold: {
      global: {
         branches: 0,
         functions: 0,
         lines: 0,
         statements: 0,
      },
   },
   errorOnDeprecated: true,
   moduleNameMapper: {
      '\\.(jpg|jpeg|png|gif|webp|svg|bmp|woff|woff2|ttf)$': '<rootDir>/test/mocks/fileMock.js',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      '@/test': '<rootDir>/test',
      '@/core': '<rootDir>/../core',
      '@/(.*)$': '<rootDir>/src/$1',
   },
   setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
   globalTeardown: '<rootDir>/test/teardown.ts',
   fakeTimers: {
      enableGlobally: true,
   },
   verbose: true,
   testEnvironment: 'node',
};
