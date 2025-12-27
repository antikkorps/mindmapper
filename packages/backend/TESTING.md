# Testing Documentation

## Overview

The backend has a comprehensive test suite using Jest with ESM support and database mocking for CI/CD compatibility.

## Test Infrastructure

### DRY Configuration

All test configuration follows the DRY (Don't Repeat Yourself) principle:

- **`tests/config/mockDb.js`**: Centralized database mocking with reusable mock functions
- **`tests/config/testHelpers.js`**: Shared test utilities, mock data generators, and helper functions
- **`tests/setup.js`**: Global test setup with no real database connections

### Key Features

1. **No Real Database**: All tests use mocked database calls - perfect for CI/CD
2. **ESM Support**: Full ES modules support with `NODE_OPTIONS='--experimental-vm-modules'`
3. **Shared Mocks**: Centralized mock configuration prevents duplication
4. **Mock Factories**: Generate test data with `generateMockUser()`, `generateMockMap()`, etc.

## Running Tests

```bash
# Run all tests
npm test

# Run unit tests only
npm run test:unit

# Run integration tests only
npm run test:integration

# Run with coverage report
npm run test:coverage

# Watch mode (auto-rerun on changes)
npm run test:watch
```

## Current Test Coverage

### Fully Tested (>70% coverage)

- ✅ **BaseService** (83.33%) - All CRUD operations
- ✅ **Hash utilities** (100%) - Password hashing with bcrypt
- ✅ **JWT utilities** (78.57%) - Token generation and verification

### Test Statistics

- **Total Tests**: 41 passing
- **Test Suites**: 3 passing
- **Overall Coverage**: 4.78% (low due to untested controllers/middlewares)

## Test Structure

```
tests/
├── config/
│   ├── mockDb.js           # Database mocking utilities
│   └── testHelpers.js      # Shared test helpers
├── setup.js                # Global test configuration
├── unit/
│   ├── services/
│   │   └── BaseService.test.js   # 18 tests
│   └── utils/
│       ├── hash.test.js          # 9 tests
│       └── jwt.test.js           # 14 tests
└── integration/
    └── (future integration tests)
```

## Writing Tests

### Example: Unit Test with Mocks

```javascript
import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import BaseService from '../../../src/services/BaseService.js'
import { mockModels, mockDbSuccess } from '../../config/mockDb.js'
import { generateMockUser } from '../../config/testHelpers.js'

describe('MyService', () => {
  let mockUser

  beforeEach(() => {
    mockUser = generateMockUser()
  })

  it('should do something', async () => {
    mockDbSuccess('User', 'findByPk', mockUser)

    const result = await MyService.doSomething(mockUser.id)

    expect(result).toBeDefined()
  })
})
```

### Mock Utilities

```javascript
// Generate mock data
const user = generateMockUser()
const map = generateMockMap(user.id)
const node = generateMockNode(map.id)

// Mock successful database response
mockDbSuccess('User', 'findByPk', mockUser)

// Mock database error
mockDbError('User', 'create', new Error('DB error'))

// Reset all mocks
resetAllMocks()
```

### Creating Mock Context (for middleware tests)

```javascript
import { createMockContext, createMockNext } from '../../config/testHelpers.js'

const ctx = createMockContext()
const next = createMockNext()

await middleware(ctx, next)

expect(next).toHaveBeenCalled()
```

## Test Best Practices

1. **Always reset mocks**: Use `beforeEach(() => resetAllMocks())`
2. **Use mock factories**: Don't create data manually - use `generateMock*()` functions
3. **Test edge cases**: Empty strings, null values, very long inputs, special characters
4. **Mock external dependencies**: Never make real API/DB calls in tests
5. **Keep tests isolated**: Each test should be independent
6. **Use descriptive names**: Test names should clearly describe what is being tested

## Known Limitations

### ESM + Jest Challenges

Jest's ESM support is still experimental. Some complex mocking scenarios don't work well:

- **Circular dependencies**: Avoid mocking modules that import each other
- **Dynamic imports**: `jest.unstable_mockModule()` has path resolution issues
- **Top-level await**: Must be used carefully with module mocking

### Current Gaps

The following need tests (future work):

- **Controllers**: authController, mapController, nodeController, userController
- **Middlewares**: auth, errorHandler, zodValidator, rateLimiter
- **Services**: MapService, NodeService, UserService
- **Integration tests**: Full API endpoint testing with supertest

## Continuous Integration

Tests are designed to run in CI/CD without any external dependencies:

- ✅ No database required (all mocked)
- ✅ No environment variables needed (test mode defaults)
- ✅ Fast execution (no I/O)
- ✅ Deterministic results (no flaky tests)

## Future Improvements

1. **Increase coverage**: Add tests for controllers and middlewares
2. **Integration tests**: Test full request/response cycles
3. **E2E tests**: Add Playwright tests for critical flows
4. **Performance tests**: Benchmark critical paths
5. **Mutation testing**: Use Stryker for test quality

## Troubleshooting

### Tests not running

```bash
# Make sure you're using the right Node version
node --version  # Should be 18+

# Clear Jest cache
npx jest --clearCache

# Run with verbose output
npm test -- --verbose
```

### Module not found errors

Check that all imports use `.js` extension:
```javascript
// ✅ Correct
import { something } from './file.js'

// ❌ Incorrect
import { something } from './file'
```

### Mock not working

Make sure you're resetting mocks:
```javascript
beforeEach(() => {
  resetAllMocks()
  jest.clearAllMocks()
})
```

## Documentation

- [Jest Documentation](https://jestjs.io/)
- [Jest ESM Support](https://jestjs.io/docs/ecmascript-modules)
- [@jest/globals](https://jestjs.io/docs/api)
