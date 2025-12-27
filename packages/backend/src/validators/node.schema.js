import { z } from 'zod'

/**
 * Node validation schemas using Zod
 */

export const createNodeSchema = z.object({
  label: z
    .string()
    .min(1, 'Label cannot be empty')
    .max(255, 'Label must be at most 255 characters')
    .optional()
    .default('New Node'),
  posX: z
    .number()
    .finite('Position X must be a valid number')
    .optional()
    .default(0),
  posY: z
    .number()
    .finite('Position Y must be a valid number')
    .optional()
    .default(0),
  parentId: z
    .string()
    .uuid('Invalid parent node ID format')
    .nullable()
    .optional(),
  mapId: z.string().uuid('Invalid map ID format'),
})

export const updateNodeSchema = z.object({
  label: z
    .string()
    .min(1, 'Label cannot be empty')
    .max(255, 'Label must be at most 255 characters')
    .optional(),
  posX: z
    .number()
    .finite('Position X must be a valid number')
    .optional(),
  posY: z
    .number()
    .finite('Position Y must be a valid number')
    .optional(),
  parentId: z
    .string()
    .uuid('Invalid parent node ID format')
    .nullable()
    .optional(),
})

export const updateNodePositionSchema = z.object({
  posX: z.number().finite('Position X must be a valid number'),
  posY: z.number().finite('Position Y must be a valid number'),
})

export const updateNodeLabelSchema = z.object({
  label: z
    .string()
    .min(1, 'Label cannot be empty')
    .max(255, 'Label must be at most 255 characters'),
})

export const nodeIdSchema = z.object({
  id: z.string().uuid('Invalid node ID format'),
})

export const nodesByMapSchema = z.object({
  mapId: z.string().uuid('Invalid map ID format'),
})
