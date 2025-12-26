'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('nodes', [
      {
        id: '20000000-0000-0000-0000-000000000001',
        label: 'Central Idea',
        posX: 400,
        posY: 300,
        parentId: null,
        mapId: '10000000-0000-0000-0000-000000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '20000000-0000-0000-0000-000000000002',
        label: 'Branch 1',
        posX: 200,
        posY: 200,
        parentId: '20000000-0000-0000-0000-000000000001',
        mapId: '10000000-0000-0000-0000-000000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '20000000-0000-0000-0000-000000000003',
        label: 'Branch 2',
        posX: 600,
        posY: 200,
        parentId: '20000000-0000-0000-0000-000000000001',
        mapId: '10000000-0000-0000-0000-000000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '20000000-0000-0000-0000-000000000004',
        label: 'Sub-branch 1.1',
        posX: 100,
        posY: 100,
        parentId: '20000000-0000-0000-0000-000000000002',
        mapId: '10000000-0000-0000-0000-000000000001',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '20000000-0000-0000-0000-000000000005',
        label: 'Main Topic',
        posX: 400,
        posY: 300,
        parentId: null,
        mapId: '10000000-0000-0000-0000-000000000002',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '20000000-0000-0000-0000-000000000006',
        label: 'Learning Goals',
        posX: 400,
        posY: 300,
        parentId: null,
        mapId: '10000000-0000-0000-0000-000000000003',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('nodes', null, {})
  },
}
