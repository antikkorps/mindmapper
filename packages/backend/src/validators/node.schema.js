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
  styleColor: z
    .enum([
      'primary',
      'secondary',
      'accent',
      'neutral',
      'info',
      'success',
      'warning',
      'error',
    ])
    .optional()
    .default('neutral'),
  styleShape: z
    .enum(['rectangle', 'rounded', 'pill', 'diamond'])
    .optional()
    .default('rounded'),
  styleType: z
    .enum(['solid', 'outline', 'ghost', 'filled'])
    .optional()
    .default('solid'),
  textRotation: z
    .enum(['follow', 'horizontal'])
    .optional()
    .default('horizontal'),
  icon: z.string().optional().nullable(),
})

export const updateNodeSchema = z.object({
  label: z
    .string()
    .min(1, 'Label cannot be empty')
    .max(255, 'Label must be at most 255 characters')
    .optional(),
  posX: z.number().finite('Position X must be a valid number').optional(),
  posY: z.number().finite('Position Y must be a valid number').optional(),
  parentId: z
    .string()
    .uuid('Invalid parent node ID format')
    .nullable()
    .optional(),
  styleColor: z
    .enum([
      'primary',
      'secondary',
      'accent',
      'neutral',
      'info',
      'success',
      'warning',
      'error',
    ])
    .optional(),
  styleShape: z.enum(['rectangle', 'rounded', 'pill', 'diamond']).optional(),
  styleType: z.enum(['solid', 'outline', 'ghost', 'filled']).optional(),
  textRotation: z.enum(['follow', 'horizontal']).optional(),
  icon: z.string().optional().nullable(),
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
