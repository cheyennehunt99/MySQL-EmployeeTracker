'use strict';

const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    viewAllDepartments() {
        return this.connection.query(
        `
        SELECT 
            department.id AS ID, 
            department.name AS Name 
        FROM 
            department;
        `
        );
        
    }

    viewAllRoles() {
        return this.connection.query(
        `
        SELECT
            role.id AS ID,
            role.title AS Role,
            role.salary AS Salary,
            department_id AS Department
        FROM
            role
        LEFT JOIN
            department ON role.department_id = department.id
        ORDER BY
            role.id;
        `
        );
        
    } 
    
    viewAllEmployees() {
        return this.connection.query(
        `
        SELECT 
            employee.id AS ID, 
            employee.first_name AS 'First Name',
            employee.last_name AS 'Last Name',
            employee.role_id AS 'Role ID',
            employee.manager_id AS 'Manager ID'
        FROM 
            employee;
        `
        );
        
    }

};

module.exports = new DB(connection);