'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('nodes', 'textRotation', {
      type: Sequelize.ENUM('follow', 'horizontal'),
      allowNull: true,
      defaultValue: 'horizontal',
    })
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('nodes', 'textRotation')
  },
}
