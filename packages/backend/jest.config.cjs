module.exports = {
  testEnvironment: 'node',

  // Enable ESM support
  preset: null,
  transform: {},

  // Test patterns
  testMatch: [
    '**/tests/**/*.test.js',
    '**/tests/**/*.spec.js',
  ],

  // Coverage
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/index.js',
    '!src/config/swagger.js', // Skip swagger config from coverage
    '!**/node_modules/**',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // Test timeout
  testTimeout: 10000,

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],

  // Ignore patterns
  testPathIgnorePatterns: ['/node_modules/'],

  // Verbose output
  verbose: true,
}
