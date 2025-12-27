/**
 * Test data factories with mock implementations
 * No real database calls - generates mock data only
 */

import {
  generateMockUser,
  generateMockMap,
  generateMockNode,
  generateMockHierarchy,
} from '../config/testHelpers.js'

/**
 * Create mock test user
 * @deprecated Use generateMockUser from testHelpers for consistency
 */
export const createTestUser = (overrides = {}) => {
  return generateMockUser(overrides)
}

/**
 * Create mock test map
 * @deprecated Use generateMockMap from testHelpers for consistency
 */
export const createTestMap = (userId, overrides = {}) => {
  return generateMockMap(userId, overrides)
}

/**
 * Create mock test node
 * @deprecated Use generateMockNode from testHelpers for consistency
 */
export const createTestNode = (mapId, overrides = {}) => {
  return generateMockNode(mapId, overrides)
}

/**
 * Create a complete mock test hierarchy: User -> Map -> Nodes
 * @deprecated Use generateMockHierarchy from testHelpers for consistency
 */
export const createTestHierarchy = () => {
  return generateMockHierarchy()
}
