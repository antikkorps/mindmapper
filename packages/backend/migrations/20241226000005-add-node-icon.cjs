'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('nodes', 'icon', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null,
    })
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('nodes', 'icon')
  },
}
