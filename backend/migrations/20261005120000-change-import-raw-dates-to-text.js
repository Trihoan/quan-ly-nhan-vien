'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_import_raw', 'birthday', {
      type: Sequelize.TEXT,
      allowNull: true
    });
    await queryInterface.changeColumn('user_import_raw', 'startDate', {
      type: Sequelize.TEXT,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('user_import_raw', 'birthday', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
    await queryInterface.changeColumn('user_import_raw', 'startDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    });
  }
};
