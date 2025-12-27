/**
 * BaseService Unit Tests
 * Testing core CRUD operations with mocked database
 */

import { describe, it, expect, beforeEach, jest } from '@jest/globals'
import BaseService from '../../../src/services/BaseService.js'
import { mockModels, mockDbSuccess, mockDbError } from '../../config/mockDb.js'
import { generateMockUser } from '../../config/testHelpers.js'

describe('BaseService', () => {
  let baseService
  let mockUser

  beforeEach(() => {
    baseService = new BaseService(mockModels.User)
    mockUser = generateMockUser()
  })

  describe('findAll', () => {
    it('should return all records', async () => {
      const mockUsers = [mockUser, generateMockUser()]
      mockDbSuccess('User', 'findAll', mockUsers)

      const result = await baseService.findAll()

      expect(result).toEqual(mockUsers)
      expect(mockModels.User.findAll).toHaveBeenCalledWith({ where: {} })
      expect(mockModels.User.findAll).toHaveBeenCalledTimes(1)
    })

    it('should filter records by where clause', async () => {
      mockDbSuccess('User', 'findAll', [mockUser])

      const where = { email: mockUser.email }
      await baseService.findAll(where)

      expect(mockModels.User.findAll).toHaveBeenCalledWith({ where })
    })

    it('should handle database errors', async () => {
      const dbError = new Error('Database connection failed')
      mockDbError('User', 'findAll', dbError)

      await expect(baseService.findAll()).rejects.toThrow('Database connection failed')
    })
  })

  describe('findById', () => {
    it('should return a record by ID', async () => {
      mockDbSuccess('User', 'findByPk', mockUser)

      const result = await baseService.findById(mockUser.id)

      expect(result).toEqual(mockUser)
      expect(mockModels.User.findByPk).toHaveBeenCalledWith(mockUser.id, {})
      expect(mockModels.User.findByPk).toHaveBeenCalledTimes(1)
    })

    it('should return null for non-existent ID', async () => {
      mockDbSuccess('User', 'findByPk', null)

      const result = await baseService.findById('non-existent-id')

      expect(result).toBeNull()
    })

    it('should handle database errors', async () => {
      const dbError = new Error('Database error')
      mockDbError('User', 'findByPk', dbError)

      await expect(baseService.findById(mockUser.id)).rejects.toThrow('Database error')
    })
  })

  describe('create', () => {
    it('should create a new record', async () => {
      const userData = {
        username: mockUser.username,
        email: mockUser.email,
        password: mockUser.password,
      }
      mockDbSuccess('User', 'create', mockUser)

      const result = await baseService.create(userData)

      expect(result).toEqual(mockUser)
      expect(mockModels.User.create).toHaveBeenCalledWith(userData)
      expect(mockModels.User.create).toHaveBeenCalledTimes(1)
    })

    it('should handle validation errors', async () => {
      const validationError = new Error('Validation failed')
      mockDbError('User', 'create', validationError)

      await expect(baseService.create({})).rejects.toThrow('Validation failed')
    })
  })

  describe('update', () => {
    it('should update a record', async () => {
      const updateData = { username: 'updated_username' }
      mockDbSuccess('User', 'update', [1]) // Sequelize returns [affectedCount]

      const result = await baseService.update(mockUser.id, updateData)

      expect(result).toBe(1) // BaseService returns just the count, not array
      expect(mockModels.User.update).toHaveBeenCalledWith(updateData, {
        where: { id: mockUser.id },
      })
    })

    it('should return 0 for non-existent record', async () => {
      mockDbSuccess('User', 'update', [0])

      const result = await baseService.update('non-existent-id', { username: 'test' })

      expect(result).toBe(0) // Just the count
    })

    it('should handle database errors', async () => {
      const dbError = new Error('Update failed')
      mockDbError('User', 'update', dbError)

      await expect(baseService.update(mockUser.id, {})).rejects.toThrow('Update failed')
    })
  })

  describe('delete', () => {
    it('should delete a record', async () => {
      mockDbSuccess('User', 'destroy', 1) // Number of deleted rows

      const result = await baseService.delete(mockUser.id)

      expect(result).toBe(1)
      expect(mockModels.User.destroy).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      })
    })

    it('should return 0 for non-existent record', async () => {
      mockDbSuccess('User', 'destroy', 0)

      const result = await baseService.delete('non-existent-id')

      expect(result).toBe(0)
    })

    it('should handle database errors', async () => {
      const dbError = new Error('Delete failed')
      mockDbError('User', 'destroy', dbError)

      await expect(baseService.delete(mockUser.id)).rejects.toThrow('Delete failed')
    })
  })

  describe('count', () => {
    it('should count records', async () => {
      mockModels.User.count = jest.fn().mockResolvedValue(5)

      const result = await baseService.count()

      expect(result).toBe(5)
      expect(mockModels.User.count).toHaveBeenCalledWith({ where: {} })
    })

    it('should count records with filter', async () => {
      mockModels.User.count = jest.fn().mockResolvedValue(2)

      const where = { status: 'active' }
      const result = await baseService.count(where)

      expect(result).toBe(2)
      expect(mockModels.User.count).toHaveBeenCalledWith({ where })
    })
  })

  describe('exists', () => {
    it('should return true if record exists', async () => {
      mockDbSuccess('User', 'findByPk', mockUser)

      const result = await baseService.exists(mockUser.id)

      expect(result).toBe(true)
    })

    it('should return false if record does not exist', async () => {
      mockDbSuccess('User', 'findByPk', null)

      const result = await baseService.exists('non-existent-id')

      expect(result).toBe(false)
    })
  })
})
