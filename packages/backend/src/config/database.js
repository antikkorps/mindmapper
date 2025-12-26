import { Sequelize } from 'sequelize'
import config from './index.js'

/**
 * Initialize Sequelize connection
 */
const { db } = config

let sequelize

if (db.url) {
  sequelize = new Sequelize(db.url, {
    dialect: db.dialect,
    logging: config.env === 'development' ? console.log : false,
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
    logging: config.env === 'development' ? console.log : false,
  })
}

/**
 * Test database connection
 */
export const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection established successfully')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw error
  }
}

export { sequelize }
export default sequelize
