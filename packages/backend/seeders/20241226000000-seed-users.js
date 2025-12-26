'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10)

    await queryInterface.bulkInsert('users', [
      {
        id: '00000000-0000-0000-0000-000000000001',
        username: 'demo',
        email: 'demo@mindmap.app',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '00000000-0000-0000-0000-000000000002',
        username: 'testuser',
        email: 'test@mindmap.app',
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {})
  },
}
