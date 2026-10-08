'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
    Employee.belongsToMany(models.Department, {
        through: models.EmployeeDepartment,
        foreignKey: 'employeeId',
        otherKey: 'departmentId',
        as: 'departments'
    });

    Employee.hasMany(models.EmployeeDepartment, {
        foreignKey: 'employeeId',
        as: 'employeeDepartments'
    });
}
  }
  Employee.init({
    lastname: DataTypes.STRING,

    firstname: DataTypes.STRING,

    birthday: DataTypes.DATEONLY,

    gender: DataTypes.STRING,

    startDate: DataTypes.DATEONLY,

    code: DataTypes.STRING,

    manager: DataTypes.STRING,

    phone: DataTypes.STRING,

    address: DataTypes.STRING,

    department: DataTypes.STRING,

    ssoEmail: DataTypes.STRING,

    role: DataTypes.STRING,

    status: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'Employee',
  });
  return Employee;
};
