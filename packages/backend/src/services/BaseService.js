/**
 * Base service class
 * Provides common CRUD operations for all models
 * Implements DRY principle - no code duplication
 */
class BaseService {
  constructor(model) {
    this.model = model
  }

  /**
   * Find all records with optional filtering
   * @param {Object} where - Filter conditions
   * @param {Object} options - Additional Sequelize options
   * @returns {Promise<Array>} Array of records
   */
  async findAll(where = {}, options = {}) {
    return this.model.findAll({
      where,
      ...options,
    })
  }

  /**
   * Find record by primary key
   * @param {string|number} id - Primary key value
   * @param {Object} options - Additional Sequelize options
   * @returns {Promise<Object|null>} Record or null if not found
   */
  async findById(id, options = {}) {
    return this.model.findByPk(id, options)
  }

  /**
   * Create a new record
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Created record
   */
  async create(data) {
    return this.model.create(data)
  }

  /**
   * Update an existing record
   * @param {string|number} id - Primary key value
   * @param {Object} data - Data to update
   * @returns {Promise<number>} Number of affected rows
   */
  async update(id, data) {
    const [affectedCount] = await this.model.update(data, {
      where: { id },
    })
    return affectedCount
  }

  /**
   * Delete a record
   * @param {string|number} id - Primary key value
   * @returns {Promise<number>} Number of deleted rows
   */
  async delete(id) {
    return this.model.destroy({
      where: { id },
    })
  }

  /**
   * Find or create a record
   * @param {Object} where - Conditions to find
   * @param {Object} defaults - Default values if not found
   * @returns {Promise<Object>} Found or created record
   */
  async findOrCreate(where, defaults = {}) {
    return this.model.findOrCreate({
      where,
      defaults,
    })
  }

  /**
   * Update or create a record
   * @param {Object} values - Values to update/create with
   * @param {Object} where - Conditions to find
   * @returns {Promise<Object>} Updated or created record
   */
  async upsert(values, where) {
    return this.model.upsert({ ...values, ...where })
  }

  /**
   * Count records
   * @param {Object} where - Filter conditions
   * @returns {Promise<number>} Count of records
   */
  async count(where = {}) {
    return this.model.count({ where })
  }

  /**
   * Check if record exists
   * @param {string|number} id - Primary key value
   * @returns {Promise<boolean>} True if exists
   */
  async exists(id) {
    const record = await this.findById(id)
    return record !== null
  }
}

export default BaseService
