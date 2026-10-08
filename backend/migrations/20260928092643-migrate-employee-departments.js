'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {

    await queryInterface.sequelize.query(`
      INSERT INTO "Departments" ("name")
      SELECT DISTINCT "department"
      FROM "Employees"
      WHERE "department" IS NOT NULL
        AND TRIM("department") <> ''
    `);

    await queryInterface.sequelize.query(`
      INSERT INTO "EmployeeDepartments"
        ("employeeId", "departmentId", "createdAt", "updatedAt")
      SELECT
        e."id",
        d."id",
        NOW(),
        NOW()
      FROM "Employees" e
      INNER JOIN "Departments" d
        ON TRIM(e."department") = TRIM(d."name")
      WHERE e."department" IS NOT NULL
        AND TRIM(e."department") <> ''
    `);
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.sequelize.query(`
      DELETE FROM "EmployeeDepartments"
    `);

    await queryInterface.sequelize.query(`
      DELETE FROM "Departments"
    `);
  }
};
