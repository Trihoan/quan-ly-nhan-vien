'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class EmployeeDepartment extends Model {
        static associate(models) {
            EmployeeDepartment.belongsTo(models.Employee, {
                foreignKey: 'employeeId',
                as: 'employee'
            });

            EmployeeDepartment.belongsTo(models.Department, {
                foreignKey: 'departmentId',
                as: 'department'
            });
        }
    }

    EmployeeDepartment.init(
        {
            employeeId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            departmentId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },

            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'EmployeeDepartment',
            tableName: 'EmployeeDepartments',
            timestamps: true
        }
    );

    return EmployeeDepartment;
};