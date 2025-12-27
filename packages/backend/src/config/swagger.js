/**
 * Swagger/OpenAPI specification
 * API documentation configuration
 */
export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'MindMapper API',
    version: '1.0.0',
    description: 'RESTful API for MindMapper - Interactive mind mapping application',
    contact: {
      name: 'MindMapper Team',
      email: 'support@mindmapper.app',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
    {
      url: 'https://api.mindmapper.app',
      description: 'Production server',
    },
  ],
  tags: [
    {
      name: 'Auth',
      description: 'Authentication endpoints',
    },
    {
      name: 'Users',
      description: 'User management endpoints',
    },
    {
      name: 'Maps',
      description: 'Mindmap CRUD operations',
    },
    {
      name: 'Nodes',
      description: 'Node CRUD operations and hierarchical management',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            description: 'User unique identifier',
          },
          username: {
            type: 'string',
            description: 'Username',
            minLength: 3,
            maxLength: 50,
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'User email address',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Map: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          title: {
            type: 'string',
            description: 'Map title',
            maxLength: 255,
          },
          userId: {
            type: 'string',
            format: 'uuid',
            description: 'Owner user ID',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Node: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
          },
          label: {
            type: 'string',
            description: 'Node label/text',
            maxLength: 255,
          },
          posX: {
            type: 'number',
            format: 'float',
            description: 'X position on canvas',
          },
          posY: {
            type: 'number',
            format: 'float',
            description: 'Y position on canvas',
          },
          parentId: {
            type: 'string',
            format: 'uuid',
            nullable: true,
            description: 'Parent node ID (null for root nodes)',
          },
          mapId: {
            type: 'string',
            format: 'uuid',
            description: 'Map ID this node belongs to',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          error: {
            oneOf: [
              {
                type: 'string',
              },
              {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                  },
                  details: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: {
                          type: 'string',
                        },
                        message: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            ],
          },
        },
      },
    },
  },
  paths: {
    '/api/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Register a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['username', 'email', 'password'],
                properties: {
                  username: {
                    type: 'string',
                    minLength: 3,
                    maxLength: 50,
                  },
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  password: {
                    type: 'string',
                    minLength: 8,
                    maxLength: 100,
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'User registered successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                        token: {
                          type: 'string',
                        },
                        refreshToken: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '409': {
            description: 'User already exists',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Login user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email: {
                    type: 'string',
                    format: 'email',
                  },
                  password: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Login successful',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'object',
                      properties: {
                        user: {
                          $ref: '#/components/schemas/User',
                        },
                        token: {
                          type: 'string',
                        },
                        refreshToken: {
                          type: 'string',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Invalid credentials',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/auth/me': {
      get: {
        tags: ['Auth'],
        summary: 'Get current authenticated user',
        security: [
          {
            bearerAuth: [],
          },
        ],
        responses: {
          '200': {
            description: 'User data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Unauthorized',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Error',
                },
              },
            },
          },
        },
      },
    },
    '/api/maps': {
      get: {
        tags: ['Maps'],
        summary: 'Get all maps',
        responses: {
          '200': {
            description: 'List of maps',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Map',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Maps'],
        summary: 'Create a new map',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['userId'],
                properties: {
                  title: {
                    type: 'string',
                    maxLength: 255,
                    default: 'Untitled Mindmap',
                  },
                  userId: {
                    type: 'string',
                    format: 'uuid',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Map created',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      $ref: '#/components/schemas/Map',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/maps/{id}': {
      get: {
        tags: ['Maps'],
        summary: 'Get map by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Map data',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      $ref: '#/components/schemas/Map',
                    },
                  },
                },
              },
            },
          },
          '404': {
            description: 'Map not found',
          },
        },
      },
      put: {
        tags: ['Maps'],
        summary: 'Update map',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: {
                    type: 'string',
                    maxLength: 255,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Map updated',
          },
        },
      },
      delete: {
        tags: ['Maps'],
        summary: 'Delete map',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Map deleted',
          },
        },
      },
    },
    '/api/maps/{id}/nodes': {
      get: {
        tags: ['Maps'],
        summary: 'Get map with all its nodes (eager loading)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Map with nodes',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      allOf: [
                        {
                          $ref: '#/components/schemas/Map',
                        },
                        {
                          type: 'object',
                          properties: {
                            nodes: {
                              type: 'array',
                              items: {
                                $ref: '#/components/schemas/Node',
                              },
                            },
                          },
                        },
                      ],
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/nodes': {
      get: {
        tags: ['Nodes'],
        summary: 'Get all nodes',
        responses: {
          '200': {
            description: 'List of nodes',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: {
                      type: 'boolean',
                      example: true,
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Node',
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Nodes'],
        summary: 'Create a new node',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['mapId'],
                properties: {
                  label: {
                    type: 'string',
                    maxLength: 255,
                    default: 'New Node',
                  },
                  posX: {
                    type: 'number',
                    default: 0,
                  },
                  posY: {
                    type: 'number',
                    default: 0,
                  },
                  parentId: {
                    type: 'string',
                    format: 'uuid',
                    nullable: true,
                  },
                  mapId: {
                    type: 'string',
                    format: 'uuid',
                  },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Node created',
          },
        },
      },
    },
    '/api/nodes/{id}': {
      get: {
        tags: ['Nodes'],
        summary: 'Get node by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Node data',
          },
        },
      },
      put: {
        tags: ['Nodes'],
        summary: 'Update node',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  label: {
                    type: 'string',
                  },
                  posX: {
                    type: 'number',
                  },
                  posY: {
                    type: 'number',
                  },
                  parentId: {
                    type: 'string',
                    format: 'uuid',
                    nullable: true,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Node updated',
          },
        },
      },
      delete: {
        tags: ['Nodes'],
        summary: 'Delete node (cascade deletes children)',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          '200': {
            description: 'Node deleted',
          },
        },
      },
    },
    '/api/nodes/{id}/position': {
      patch: {
        tags: ['Nodes'],
        summary: 'Update node position',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['posX', 'posY'],
                properties: {
                  posX: {
                    type: 'number',
                  },
                  posY: {
                    type: 'number',
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Position updated',
          },
        },
      },
    },
    '/api/nodes/{id}/label': {
      patch: {
        tags: ['Nodes'],
        summary: 'Update node label',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['label'],
                properties: {
                  label: {
                    type: 'string',
                    maxLength: 255,
                  },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Label updated',
          },
        },
      },
    },
  },
}
