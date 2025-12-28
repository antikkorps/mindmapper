'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('maps', [
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c1',
        title: 'My First Mindmap',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c2',
        title: 'Project Ideas',
        userId: '550e8400-e29b-41d4-a716-446655440001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c3',
        title: 'Learning Plan',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c4',
        title: 'Test User Map 1',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '6ba7b810-9dad-11d1-80b4-00c04fd430c5',
        title: 'Test User Map 2',
        userId: '550e8400-e29b-41d4-a716-446655440002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('maps', null, {})
  },
}
