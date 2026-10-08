'use strict';

const { randomUUID } = require('node:crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('user_import_raw', 'batch_id', {
      type: Sequelize.UUID,
      allowNull: true
    });
    await queryInterface.addColumn('user_import_raw', 'processing_status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending'
    });

    const [rows] = await queryInterface.sequelize.query(
      'SELECT id FROM user_import_raw WHERE batch_id IS NULL'
    );
    for (const row of rows) {
      await queryInterface.sequelize.query(
        'UPDATE user_import_raw SET batch_id = $1 WHERE id = $2',
        { bind: [randomUUID(), row.id] }
      );
    }

    await queryInterface.changeColumn('user_import_raw', 'batch_id', {
      type: Sequelize.UUID,
      allowNull: false
    });
    await queryInterface.addIndex('user_import_raw', ['batch_id', 'row_number'], {
      unique: true,
      name: 'user_import_raw_batch_row_unique'
    });
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('user_import_raw', 'user_import_raw_batch_row_unique');
    await queryInterface.removeColumn('user_import_raw', 'processing_status');
    await queryInterface.removeColumn('user_import_raw', 'batch_id');
  }
};
