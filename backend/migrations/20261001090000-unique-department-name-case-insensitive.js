'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const [duplicates] = await queryInterface.sequelize.query(`
      SELECT lower(btrim("name")) AS normalized_name,
             array_agg("id" ORDER BY "id") AS department_ids
      FROM "Departments"
      GROUP BY lower(btrim("name"))
      HAVING count(*) > 1
    `);

    if (duplicates.length > 0) {
      throw new Error(
        `Cannot add case-insensitive department index; duplicate normalized names exist: ${JSON.stringify(duplicates)}`
      );
    }

    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX "Departments_name_lower_trim_unique"
      ON "Departments" (lower(btrim("name")))
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS "Departments_name_lower_trim_unique"
    `);
  }
};
