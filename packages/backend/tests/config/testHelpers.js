import { v4 as uuidv4 } from 'uuid'
import { jest } from '@jest/globals'

/**
 * DRY test utilities and helpers
 * Shared configuration to avoid repetition
 */

/**
 * Generate mock user data
 */
export const generateMockUser = (overrides = {}) => ({
  id: uuidv4(),
  username: `testuser_${Date.now()}`,
  email: `test_${Date.now()}@example.com`,
  password: '$2b$10$hashedpassword123',
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

/**
 * Generate mock map data
 */
export const generateMockMap = (userId, overrides = {}) => ({
  id: uuidv4(),
  title: `Test Map ${Date.now()}`,
  userId,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

/**
 * Generate mock node data
 */
export const generateMockNode = (mapId, overrides = {}) => ({
  id: uuidv4(),
  label: `Test Node ${Date.now()}`,
  posX: 0,
  posY: 0,
  mapId,
  parentId: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
})

/**
 * Generate complete mock hierarchy
 */
export const generateMockHierarchy = () => {
  const user = generateMockUser()
  const map = generateMockMap(user.id)

  const rootNode = generateMockNode(map.id, {
    label: 'Root Node',
    posX: 100,
    posY: 100,
  })

  const childNode1 = generateMockNode(map.id, {
    label: 'Child Node 1',
    posX: 50,
    posY: 200,
    parentId: rootNode.id,
  })

  const childNode2 = generateMockNode(map.id, {
    label: 'Child Node 2',
    posX: 150,
    posY: 200,
    parentId: rootNode.id,
  })

  const grandChildNode = generateMockNode(map.id, {
    label: 'Grand Child Node',
    posX: 25,
    posY: 300,
    parentId: childNode1.id,
  })

  return {
    user,
    map,
    nodes: {
      root: rootNode,
      child1: childNode1,
      child2: childNode2,
      grandChild: grandChildNode,
    },
  }
}

/**
 * Common test timeout values
 */
export const TEST_TIMEOUTS = {
  SHORT: 1000,
  MEDIUM: 5000,
  LONG: 10000,
}

/**
 * Common test error messages
 */
export const TEST_ERRORS = {
  NOT_FOUND: 'Resource not found',
  UNAUTHORIZED: 'Unauthorized',
  VALIDATION_FAILED: 'Validation failed',
  SERVER_ERROR: 'Internal server error',
}

/**
 * Mock request/response helpers for Koa
 */
export const createMockContext = (overrides = {}) => ({
  request: {
    body: {},
    headers: {},
    ...overrides.request,
  },
  response: {},
  state: {},
  status: null,
  body: null,
  throw: jest.fn((status, message) => {
    throw new Error(message)
  }),
  ...overrides,
})

/**
 * Create mock next middleware function
 */
export const createMockNext = () => jest.fn().mockResolvedValue()

/**
 * Assert standard API response structure
 */
export const expectApiResponse = (response, expectedStatus) => {
  expect(response.status).toBe(expectedStatus)
  expect(response.body).toHaveProperty('success')

  if (expectedStatus >= 200 && expectedStatus < 300) {
    expect(response.body.success).toBe(true)
    expect(response.body).toHaveProperty('data')
  } else {
    expect(response.body.success).toBe(false)
    expect(response.body).toHaveProperty('error')
  }
}
