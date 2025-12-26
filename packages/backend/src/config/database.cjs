require('dotenv').config()

/**
 * Sequelize configuration for all environments
 * Supports both local PostgreSQL (Docker) and cloud databases (Neon, etc.)
 */

// Helper function to generate config based on DATABASE_URL or individual params
const getConfig = env => {
  const baseConfig = {
    dialect: 'postgres',
    logging: env === 'development' ? console.log : false,
  }

  // If DATABASE_URL is provided (cloud database like Neon), use it
  if (process.env.DATABASE_URL) {
    return {
      ...baseConfig,
      use_env_variable: 'DATABASE_URL',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false, // For Neon and similar services
        },
      },
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    }
  }

  // Otherwise, use traditional connection parameters (local Docker)
  return baseConfig
}

module.exports = {
  development: {
    ...getConfig('development'),
    username: process.env.DB_USER || 'mindmapper',
    password: process.env.DB_PASSWORD || 'mindmapper_dev',
    database: process.env.DB_NAME || 'mindmapper_db',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5140,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    ...getConfig('test'),
    username: process.env.DB_USER || 'mindmapper',
    password: process.env.DB_PASSWORD || 'mindmapper_dev',
    database: process.env.DB_NAME_TEST || 'mindmapper_db_test',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5140,
  },
  production: {
    ...getConfig('production'),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000,
    },
  },
}
