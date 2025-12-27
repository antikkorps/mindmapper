'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('nodes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'New Node',
      },
      posX: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      posY: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      parentId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'nodes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      mapId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'maps',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    })

    await queryInterface.addIndex('nodes', ['parentId'])
    await queryInterface.addIndex('nodes', ['mapId'])
  },

  async down(queryInterface) {
    await queryInterface.dropTable('nodes')
  },
}
