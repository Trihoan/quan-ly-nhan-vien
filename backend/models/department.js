'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Department extends Model {
        static associate(models) {
            Department.belongsToMany(models.Employee, {
                through: models.EmployeeDepartment,
                foreignKey: 'departmentId',
                otherKey: 'employeeId',
                as: 'employees'
            });

            Department.hasMany(models.EmployeeDepartment, {
                foreignKey: 'departmentId',
                as: 'employeeDepartments'
            });
        }
    }

    Department.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            }
        },
        {
            sequelize,
            modelName: 'Department',
            tableName: 'Departments',
            timestamps: false
        }
    );

    return Department;
};
