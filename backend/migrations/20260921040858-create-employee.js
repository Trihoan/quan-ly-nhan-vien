'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },

      lastname: { type: Sequelize.STRING, allowNull: false },

      firstname: { type: Sequelize.STRING, allowNull: false },

      birthday: { type: Sequelize.DATEONLY, allowNull: true },

      gender: { type: Sequelize.STRING, allowNull: true },

      startDate: { type: Sequelize.DATEONLY, allowNull: true },

      code: { type: Sequelize.STRING, allowNull: false, unique: true },
      
      manager: { type: Sequelize.STRING, allowNull: true },

      phone: { type: Sequelize.STRING, allowNull: false },

      address: { type: Sequelize.STRING, allowNull: true },

      department: { type: Sequelize.STRING, allowNull: true },

      ssoEmail: { type: Sequelize.STRING, allowNull: false, unique: true },

      role: { type: Sequelize.STRING, allowNull: true },

      status: { type: Sequelize.STRING, allowNull: false },

      createdAt: { allowNull: false, type: Sequelize.DATE },

      updatedAt: { allowNull: false, type: Sequelize.DATE }

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees');
  }
};