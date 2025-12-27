/**
 * Mock database configuration for tests
 * Provides mock implementations of Sequelize models
 */

import { jest } from '@jest/globals'

export const mockModels = {
  User: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  Map: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
  Node: {
    create: jest.fn(),
    findByPk: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
  },
}

/**
 * Reset all mocks between tests
 */
export const resetAllMocks = () => {
  Object.values(mockModels).forEach(model => {
    Object.values(model).forEach(method => {
      method.mockReset()
    })
  })
}

/**
 * Mock successful database responses
 */
export const mockDbSuccess = (model, method, returnValue) => {
  mockModels[model][method].mockResolvedValue(returnValue)
}

/**
 * Mock database errors
 */
export const mockDbError = (model, method, error) => {
  mockModels[model][method].mockRejectedValue(error)
}

/**
 * Create a mock Sequelize instance
 */
export const mockSequelize = {
  authenticate: jest.fn().mockResolvedValue(true),
  sync: jest.fn().mockResolvedValue(true),
  close: jest.fn().mockResolvedValue(true),
  transaction: jest.fn(callback => callback({})),
}
