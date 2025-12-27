/**
 * Hash Utility Unit Tests
 * Testing password hashing and comparison
 */

import { describe, it, expect } from '@jest/globals'
import { hashPassword, comparePassword } from '../../../src/utils/hash.js'

describe('Hash Utilities', () => {
  const plainPassword = 'testPassword123'

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const hashed = await hashPassword(plainPassword)

      expect(hashed).toBeDefined()
      expect(typeof hashed).toBe('string')
      expect(hashed).not.toBe(plainPassword)
      expect(hashed.startsWith('$2b$')).toBe(true) // bcrypt format
    })

    it('should create different hashes for same password', async () => {
      const hash1 = await hashPassword(plainPassword)
      const hash2 = await hashPassword(plainPassword)

      expect(hash1).not.toBe(hash2) // Different salts
    })

    it('should hash different passwords differently', async () => {
      const hash1 = await hashPassword('password1')
      const hash2 = await hashPassword('password2')

      expect(hash1).not.toBe(hash2)
    })
  })

  describe('comparePassword', () => {
    it('should return true for matching password', async () => {
      const hashed = await hashPassword(plainPassword)
      const result = await comparePassword(plainPassword, hashed)

      expect(result).toBe(true)
    })

    it('should return false for non-matching password', async () => {
      const hashed = await hashPassword(plainPassword)
      const result = await comparePassword('wrongPassword', hashed)

      expect(result).toBe(false)
    })

    it('should handle empty passwords', async () => {
      const hashed = await hashPassword('')
      const result = await comparePassword('', hashed)

      expect(result).toBe(true)
    })
  })

  describe('edge cases', () => {
    it('should handle very long passwords', async () => {
      const longPassword = 'a'.repeat(500)
      const hashed = await hashPassword(longPassword)
      const result = await comparePassword(longPassword, hashed)

      expect(result).toBe(true)
    })

    it('should handle special characters', async () => {
      const specialPassword = '!@#$%^&*()_+-={}[]|:";\'<>?,./`~'
      const hashed = await hashPassword(specialPassword)
      const result = await comparePassword(specialPassword, hashed)

      expect(result).toBe(true)
    })

    it('should handle unicode characters', async () => {
      const unicodePassword = 'パスワード123🔐'
      const hashed = await hashPassword(unicodePassword)
      const result = await comparePassword(unicodePassword, hashed)

      expect(result).toBe(true)
    })
  })
})
