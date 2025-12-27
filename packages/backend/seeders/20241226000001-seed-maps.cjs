'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('maps', [
      {
        id: '10000000-0000-0000-0000-000000000001',
        title: 'My First Mindmap',
        userId: '00000000-0000-0000-0000-000000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '10000000-0000-0000-0000-000000000002',
        title: 'Project Ideas',
        userId: '00000000-0000-0000-0000-000000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '10000000-0000-0000-0000-000000000003',
        title: 'Learning Plan',
        userId: '00000000-0000-0000-0000-000000000002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('maps', null, {})
  },
}
