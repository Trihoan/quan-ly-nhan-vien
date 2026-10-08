'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_import_raw', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      row_number: { type: Sequelize.INTEGER, allowNull: false },
      lastname: { type: Sequelize.STRING, allowNull: false },
      firstname: { type: Sequelize.STRING, allowNull: false },
      birthday: { type: Sequelize.TEXT, allowNull: true },
      gender: { type: Sequelize.STRING, allowNull: true },
      startDate: { type: Sequelize.TEXT, allowNull: true },
      code: { type: Sequelize.STRING, allowNull: false },
      manager: { type: Sequelize.STRING, allowNull: true },
      phone: { type: Sequelize.STRING, allowNull: false },
      address: { type: Sequelize.STRING, allowNull: true },
      department: { type: Sequelize.STRING, allowNull: false },
      ssoEmail: { type: Sequelize.STRING, allowNull: false },
      is_scanned: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      validation_errors: { type: Sequelize.JSONB, allowNull: false, defaultValue: [] },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updated_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_import_raw');
  }
};
