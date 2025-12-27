import { z } from 'zod'

/**
 * Map validation schemas using Zod
 */

export const createMapSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be at most 255 characters')
    .optional()
    .default('Untitled Mindmap'),
  userId: z.string().uuid('Invalid user ID format'),
})

export const updateMapSchema = z.object({
  title: z
    .string()
    .min(1, 'Title cannot be empty')
    .max(255, 'Title must be at most 255 characters'),
})

export const mapIdSchema = z.object({
  id: z.string().uuid('Invalid map ID format'),
})

export const mapsByUserSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
})
