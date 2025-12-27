import { Sequelize } from 'sequelize'
import config from './index.js'
import logger from './logger.js'

/**
 * Initialize Sequelize connection
 */
const { db } = config

let sequelize

if (db.url) {
  sequelize = new Sequelize(db.url, {
    dialect: db.dialect,
    logging: config.env === 'development' ? (msg) => logger.debug(msg) : false,
    dialectOptions: db.ssl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : undefined,
  })
} else {
  sequelize = new Sequelize(db.database, db.user, db.password, {
    host: db.host,
    port: db.port,
    dialect: db.dialect,
    logging: config.env === 'development' ? (msg) => logger.debug(msg) : false,
  })
}

/**
 * Test database connection
 */
export const testConnection = async () => {
  try {
    await sequelize.authenticate()
    logger.info('Database connection established successfully')
  } catch (error) {
    logger.error('Unable to connect to the database:', error)
    throw error
  }
}

export { sequelize }
export default sequelize
