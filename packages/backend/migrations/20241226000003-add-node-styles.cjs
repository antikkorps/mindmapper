'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('nodes', 'styleColor', {
      type: Sequelize.ENUM(
        'primary',
        'secondary',
        'accent',
        'neutral',
        'info',
        'success',
        'warning',
        'error'
      ),
      allowNull: true,
      defaultValue: 'neutral',
    })

    await queryInterface.addColumn('nodes', 'styleShape', {
      type: Sequelize.ENUM('rectangle', 'rounded', 'pill', 'diamond'),
      allowNull: true,
      defaultValue: 'rounded',
    })

    await queryInterface.addColumn('nodes', 'styleType', {
      type: Sequelize.ENUM('solid', 'outline', 'ghost', 'filled'),
      allowNull: true,
      defaultValue: 'solid',
    })
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('nodes', 'styleColor')
    await queryInterface.removeColumn('nodes', 'styleShape')
    await queryInterface.removeColumn('nodes', 'styleType')
  },
}
