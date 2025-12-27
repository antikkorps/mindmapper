/**
 * Global test setup with database mocking
 * Runs before all tests - no real database connections
 */

import { jest } from '@jest/globals'
import { resetAllMocks } from './config/mockDb.js'

// Reset all mocks before each test
beforeEach(() => {
  resetAllMocks()
  jest.clearAllMocks()
})

// Global test setup
beforeAll(async () => {
  // No real database connection - using mocks
  console.log('Test environment initialized with mocked database')
})

afterAll(async () => {
  // Clean up mocks
  jest.clearAllMocks()
})
