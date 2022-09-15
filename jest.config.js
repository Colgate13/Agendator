module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/I*.ts',
    '!src/modules/User/useCases/CreateUser/Errors/AccountAlreadyExistsError.ts',
    '!src/**/useCases/errors/*.ts',
    '!src/**/useCases/*/errors/*.ts',
    '!src/**/mappers/**.ts',
    '!src/**/repositories/**/*.ts',
    '!src/**/@types/*.ts',
    '!src/**/config/*.ts',
    '!src/infra/**/*.ts',
    '!src/core/**/*.ts',
    '!src/shared/Error/*',
    '!src/shared/Config/**',
    '!src/server.ts',
  ],
  testMatch: ['**/*.spec.ts', '**/*.test.ts'],
  coverageReporters: ['text-summary', 'lcov', 'html', 'json', 'text', 'clover'],
  preset: 'ts-jest',
};
