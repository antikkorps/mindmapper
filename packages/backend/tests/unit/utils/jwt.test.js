/**
 * JWT Utility Unit Tests
 * Testing JWT token generation and verification
 */

import { describe, it, expect } from '@jest/globals'
import { generateToken, generateRefreshToken, verifyToken } from '../../../src/utils/jwt.js'

describe('JWT Utilities', () => {
  const mockUserPayload = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    username: 'testuser',
  }

  describe('generateToken', () => {
    it('should generate a valid JWT token', () => {
      const token = generateToken(mockUserPayload)

      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3) // JWT has 3 parts
    })

    it('should include user data in token', () => {
      const token = generateToken(mockUserPayload)
      const decoded = verifyToken(token)

      expect(decoded.id).toBe(mockUserPayload.id)
      expect(decoded.email).toBe(mockUserPayload.email)
      expect(decoded.username).toBe(mockUserPayload.username)
    })

    it('should include issuer and audience', () => {
      const token = generateToken(mockUserPayload)
      const decoded = verifyToken(token)

      expect(decoded.iss).toBe('mindmapper-api')
      expect(decoded.aud).toBe('mindmapper-app')
    })

    it('should include expiration', () => {
      const token = generateToken(mockUserPayload)
      const decoded = verifyToken(token)

      expect(decoded.exp).toBeDefined()
      expect(decoded.exp).toBeGreaterThan(Math.floor(Date.now() / 1000))
    })
  })

  describe('generateRefreshToken', () => {
    it('should generate a valid refresh token', () => {
      const token = generateRefreshToken(mockUserPayload)

      expect(token).toBeDefined()
      expect(typeof token).toBe('string')
      expect(token.split('.')).toHaveLength(3)
    })

    it('should have longer expiration than access token', () => {
      const accessToken = generateToken(mockUserPayload)
      const refreshToken = generateRefreshToken(mockUserPayload)

      const accessDecoded = verifyToken(accessToken)
      const refreshDecoded = verifyToken(refreshToken)

      expect(refreshDecoded.exp).toBeGreaterThan(accessDecoded.exp)
    })
  })

  describe('verifyToken', () => {
    it('should verify a valid token', () => {
      const token = generateToken(mockUserPayload)
      const decoded = verifyToken(token)

      expect(decoded).toBeDefined()
      expect(decoded.id).toBe(mockUserPayload.id)
    })

    it('should throw error for invalid token', () => {
      expect(() => {
        verifyToken('invalid.token.here')
      }).toThrow()
    })

    it('should throw error for malformed token', () => {
      expect(() => {
        verifyToken('not-a-jwt')
      }).toThrow()
    })

    it('should throw error for empty token', () => {
      expect(() => {
        verifyToken('')
      }).toThrow()
    })
  })

  describe('token expiration', () => {
    it('should generate token that is currently valid', () => {
      const token = generateToken(mockUserPayload)

      expect(() => verifyToken(token)).not.toThrow()
    })

    it('should include iat (issued at) claim', () => {
      const token = generateToken(mockUserPayload)
      const decoded = verifyToken(token)

      expect(decoded.iat).toBeDefined()
      expect(decoded.iat).toBeLessThanOrEqual(Math.floor(Date.now() / 1000))
    })
  })

  describe('edge cases', () => {
    it('should handle minimal payload', () => {
      const minimalPayload = {
        id: '123',
        email: 'a@b.c',
        username: 'a',
      }

      const token = generateToken(minimalPayload)
      const decoded = verifyToken(token)

      expect(decoded.id).toBe('123')
    })

    it('should handle payload with extra fields', () => {
      const extraPayload = {
        ...mockUserPayload,
        role: 'admin',
        createdAt: new Date().toISOString(),
      }

      const token = generateToken(extraPayload)

      expect(() => verifyToken(token)).not.toThrow()
    })
  })
})
