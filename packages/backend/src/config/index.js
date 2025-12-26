import dotenv from 'dotenv'

dotenv.config()

/**
 * Application configuration
 * Supports both local PostgreSQL (Docker) and cloud databases (e.g., Neon)
 */
export default {
  port: parseInt(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || 'development',
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  },
  db: {
    // Support for cloud databases (Neon, etc.) via connection string
    url: process.env.DATABASE_URL || null,
    // Traditional connection parameters for local Docker PostgreSQL
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 5140,
    user: process.env.DB_USER || 'mindmapper',
    password: process.env.DB_PASSWORD || 'mindmapper_dev',
    database: process.env.DB_NAME || 'mindmapper_db',
    dialect: process.env.DB_DIALECT || 'postgres',
    // SSL configuration for cloud databases
    ssl: process.env.DB_SSL === 'true' || process.env.DATABASE_URL ? true : false,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
}
