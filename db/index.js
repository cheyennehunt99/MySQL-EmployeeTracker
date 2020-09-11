'use strict';

const connection = require('./connection');
const { title } = require('process');
const { join } = require('path');

// module.exports = new DB(connection)

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    viewAllDepartments() {
        return this.connection.query(
            `
            SELECT
                department.id,
                department.name
            FROM 
                department 
            ORDER BY
                department.id;
            `
        );
    }

    viewAllRoles() {
        return this.connection.query(
            `
        SELECT
            roles.id,
            roles.name AS Role,
            roles.salary AS Salary,
            departments.name AS Department
        FROM
            roles
        LEFT JOIN
            departments ON roles.department_id = departments.id
        ORDER BY
            roles.id;
            ` 
        );
    };
   
    viewAllEmployees() {
        return this.connection.query(
            `
            SELECT
            employees.id AS ID,
            employees.first_name AS First_Name,
            employees.last_name AS Last_Name,
            role.name AS Role,
            department.name AS Department,
            role.salary AS Salary,
            CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
        FROM
            employees 
        LEFT JOIN
            roles ON employees.role_id = roles.id
        LEFT JOIN
           department ON role
         LEFT JOIN 
           employees manager ON manager.id = employees.manager_id
       ORDER BY
           Department;
            `
        );
    }

    createDepartment(department) {
        return this.connection.query(
            `
        INSERT INTO
            department
        SET
            ?
        `, department

        );
    }

    createRole(role) {
        return this.connection.query(
            `
        INSERT INTO
            role
        SET
            ?
        `, role
        );
    }

    createEmployee(employee) {
        return this.connection.query(
            `
        INSERT INTO
            employees
        SET
            ?
        `, employee
        );
    }

    updateEmployeeRole(roleId, employeeId) {
        return this.connection.query(
            `
        UPDATE 
            employee
        SET
            role_id = ?
        WHERE
            id = ?
        `, [roleId, employeeId]
        );
    }

}

module.exports = new DB(connection)