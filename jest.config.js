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
  preset: 'ts-jest',
}
