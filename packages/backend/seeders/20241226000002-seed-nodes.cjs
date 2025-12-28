'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('nodes', [
      // Nodes for demo user's map 1
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae1',
        label: 'Central Idea',
        posX: 400,
        posY: 300,
        parentId: null,
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae2',
        label: 'Branch 1',
        posX: 200,
        posY: 200,
        parentId: '7c9e6679-7425-40de-944b-e07fc1f90ae1',
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae3',
        label: 'Branch 2',
        posX: 600,
        posY: 200,
        parentId: '7c9e6679-7425-40de-944b-e07fc1f90ae1',
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae4',
        label: 'Sub-branch 1.1',
        posX: 100,
        posY: 100,
        parentId: '7c9e6679-7425-40de-944b-e07fc1f90ae2',
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Nodes for demo user's map 2
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae5',
        label: 'Main Topic',
        posX: 400,
        posY: 300,
        parentId: null,
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Nodes for testuser's map 1 (Learning Plan)
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae6',
        label: 'Learning Goals',
        posX: 400,
        posY: 300,
        parentId: null,
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        label: 'Frontend Skills',
        posX: 250,
        posY: 200,
        parentId: '7c9e6679-7425-40de-944b-e07fc1f90ae6',
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae8',
        label: 'Backend Skills',
        posX: 550,
        posY: 200,
        parentId: '7c9e6679-7425-40de-944b-e07fc1f90ae6',
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Nodes for testuser's map 2
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90ae9',
        label: 'Test Map Root',
        posX: 400,
        posY: 300,
        parentId: null,
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Nodes for testuser's map 3
      {
        id: '7c9e6679-7425-40de-944b-e07fc1f90aea',
        label: 'Another Test Node',
        posX: 400,
        posY: 300,
        parentId: null,
        mapId: '6ba7b810-9dad-11d1-80b4-00c04fd430c5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('nodes', null, {})
  },
}
