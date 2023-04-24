'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('alternate_datas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      asset_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'assets',
          key: 'id',
        },
      },
      criteria_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'criterias',
          key: 'id',
        },
      },
      data_value: {
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('alternate_datas')
  },
}
