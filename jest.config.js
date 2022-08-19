const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/I*.ts',
    '!src/**/@types/*.ts',
    '!src/**/config/*.ts',
    '!src/infra/**/*.ts',
    '!src/core/**/*.ts',
    '!src/shared/Error/*',
    '!src/server.ts'
  ],
  testMatch: [
    '**/*.spec.ts',
    '**/*.test.ts',
  ],
  coverageReporters: [
    'text-summary',
    'lcov',
    'html'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src',
  }),
  preset: 'ts-jest',
}

// import { pathsToModuleNameMapper } from 'ts-jest/utils'
// import { compilerOptions } from './tsconfig.json'

// export default {
//   clearMocks: true,
//   coverageDirectory: 'coverage',
//   testEnvironment: 'node',
//   collectCoverageFrom: [
//     'src/**/*.ts',
//     '!src/**/I*.ts',
//     '!src/**/@types/*.ts',
//     '!src/**/config/*.ts',
//     '!src/infra/**/*.ts',
//     '!src/core/**/*.ts',
//   ],
//   testMatch: [
//     '**/*.spec.ts',
//     '**/*.test.ts',
//   ],
//   coverageReporters: [
//     'text-summary',
//     'lcov',
//     'html'
//   ],
//   moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
//     prefix: '<rootDir>/src',
//   }),
//   preset: 'ts-jest',
// }

